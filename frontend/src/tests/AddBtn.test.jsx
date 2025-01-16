import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import AddBtnComponent from '../components/AddBtn';
// Mock the dependencies
jest.mock('../lib/cartapi');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Create a mock store
const mockDispatch = jest.fn();
const queryClient = new QueryClient();

describe('AddBtnComponent', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    useSelector.mockImplementation(selector => 
      selector({ authReducer: { isEmail: 'test@example.com' } })
    );
    useDispatch.mockReturnValue(mockDispatch);
  });

  const renderComponent = (props = { item: '123' }) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <Provider store={{}}>
          <AddBtnComponent {...props} />
        </Provider>
      </QueryClientProvider>
    );
  };

  it('renders the Add to Order button', () => {
    renderComponent();
    expect(screen.getByText('Add to Order')).toBeInTheDocument();
  });

  // it('shows loading state when mutation is in progress', async () => {
  //   updateCart.mockImplementation(() => 
  //     new Promise(resolve => setTimeout(resolve, 100))
  //   );
    
  //   renderComponent();
    
  //   const button = screen.getByText('Add to Order');
  //   fireEvent.click(button);
    
  //   // Check for loading indicator
  //   expect(screen.getByClass('loading-dots')).toBeInTheDocument();
  //   expect(button).toBeDisabled();
  // });

  it('shows success toast when mutation succeeds', async () => {
    const mockResponse = {
      data: {
        user: {
          cart: ['item1', 'item2']
        }
      }
    };
    
    updateCart.mockResolvedValueOnce(mockResponse);
    
    renderComponent();
    
    const button = screen.getByText('Add to Order');
    fireEvent.click(button);
    
    // Wait for success toast
    await screen.findByText('Item added successfully!');
    
    // Verify dispatch was called with correct data
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: ['item1', 'item2']
      })
    );
  });

  it('shows error toast when mutation fails', async () => {
    updateCart.mockRejectedValueOnce(new Error('Failed to update cart'));
    
    renderComponent();
    
    const button = screen.getByText('Add to Order');
    fireEvent.click(button);
    
    // Wait for error toast
    await screen.findByText('Log In to order');
  });

  it('closes success toast when clicking close button', async () => {
    const mockResponse = {
      data: {
        user: {
          cart: ['item1']
        }
      }
    };
    
    updateCart.mockResolvedValueOnce(mockResponse);
    
    renderComponent();
    
    // Trigger success scenario
    fireEvent.click(screen.getByText('Add to Order'));
    
    // Wait for success toast
    const toast = await screen.findByText('Item added successfully!');
    const closeButton = screen.getByRole('button', { name: /✕/i });
    
    // Close the toast
    fireEvent.click(closeButton);
    
    // Verify toast is removed
    await act(async () => {
      expect(toast).not.toBeInTheDocument();
    });
  });

  // it('closes error toast when clicking close button', async () => {
  //   updateCart.mockRejectedValueOnce(new Error('Failed to update cart'));
    
  //   renderComponent();
    
  //   // Trigger error scenario
  //   fireEvent.click(screen.getByText('Add to Order'));
    
  //   // Wait for error toast
  //   const toast = await screen.findByText('Log In to order');
  //   const closeButton = screen.getByRole('button', { name: 'Close notification' });
    
  //   // Close the toast
  //   fireEvent.click(closeButton);
    
  //   // Verify toast is removed
  //   await act(async () => {
  //     expect(toast).not.toBeInTheDocument();
  //   });
  // });

  it('prevents event propagation when clicking the button', () => {
    renderComponent();
    
    const button = screen.getByText('Add to Order');
    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    
    fireEvent.click(button, mockEvent);
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  // it('sends correct data to updateCart when button is clicked', () => {
  //   const testItemId = '123';
  //   renderComponent({ item: testItemId });
    
  //   fireEvent.click(screen.getByText('Add to Order'));
    
  //   expect(updateCart).toHaveBeenCalledWith({
  //     isEmail: 'test@example.com',
  //     newCartItem: {
  //       productId: testItemId,
  //       quantity: 1
  //     }
  //   });
  // });
});
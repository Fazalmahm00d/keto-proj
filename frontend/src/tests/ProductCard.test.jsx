import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';
import AddBtnComponent from '../components/AddBtn';

jest.mock('../components/AddBtn', () => jest.fn(() => <button>Add to Cart</button>));

describe('ProductCard Component', () => {
  const mockProps = {
    data: {
      _id: '12345',
      name: 'Test Product',
      price: '$19.99',
      img: 'https://via.placeholder.com/150',
    },
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test('renders ProductCard component with props', () => {
    renderWithRouter(<ProductCard {...mockProps} />);

    // Check the product name
    const productName = screen.getByText(mockProps.data.name);
    expect(productName).toBeInTheDocument();
    expect(productName).toHaveClass('text-2xl font-semibold text-gray-800');

    // Check the product price
    const productPrice = screen.getByText(mockProps.data.price);
    expect(productPrice).toBeInTheDocument();
    expect(productPrice).toHaveClass('text-xl text-gray-600 mt-2');

    // Check the product image
    const productImage = screen.getByRole('img', { name: mockProps.data.name });
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', mockProps.data.img);
    expect(productImage).toHaveAttribute('alt', mockProps.data.name);

    // Check the link
    const linkElement = screen.getByRole('link', { name: /test product/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/menu/${mockProps.data._id}`);
  });

  test('renders AddBtnComponent', () => {
    renderWithRouter(<ProductCard {...mockProps} />);

    // Check that AddBtnComponent is rendered
    const addBtn = screen.getByRole('button', { name: /add to cart/i });
    expect(addBtn).toBeInTheDocument();
  });

  test('applies correct classes to the container', () => {
    renderWithRouter(<ProductCard {...mockProps} />);

    // Check the main container
    const container = screen.getByRole('link', { name: /test product/i }).firstChild;
    expect(container).toHaveClass(
      'h-auto md:h-[18rem] p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-6'
    );
  });
});

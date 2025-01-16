import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Category from '../components/Category';

describe('Category Component', () => {
  const mockProps = {
    img: 'https://via.placeholder.com/150',
    data: 'Test Category',
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test('renders Category component with props', () => {
    renderWithRouter(<Category {...mockProps} />);

    // Check that the image is rendered with the correct src and alt text
    const imageElement = screen.getByRole('img', { name: mockProps.data });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProps.img);
    expect(imageElement).toHaveAttribute('alt', mockProps.data);

    // Check that the link is rendered with the correct destination
    const linkElement = screen.getByRole('link', { name: /test category/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/menu');

    // Check that the text is rendered correctly
    const textElement = screen.getByText(mockProps.data);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('decoration-none');
  });

  test('applies hover effect on the image', () => {
    renderWithRouter(<Category {...mockProps} />);

    const imageElement = screen.getByRole('img', { name: mockProps.data });
    expect(imageElement).toHaveClass(
      'transition-transform duration-500 hover:scale-110 hover:shadow-none'
    );
  });
  test('applies correct classes to the container', () => {
    renderWithRouter(<Category {...mockProps} />);
  
    const container = screen.getByTestId('category-container'); // Use data-testid
    expect(container).toHaveClass('w-full p-4 text-[rgba(61,8,27,0.75)]');
  });
  
});

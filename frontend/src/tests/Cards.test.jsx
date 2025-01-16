import { render, screen } from '@testing-library/react';
import Cards from '../components/Cards';

describe('Cards Component', () => {
  it('renders with provided data', () => {
    const testData = "Test Content";
    render(<Cards data={testData} />);
    
    // Check if the content is rendered
    expect(screen.getByText(testData)).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<Cards data="Test" />);
    
    // Get the main container div
    const container = screen.getByText('Test').closest('div.w-full');
    
    // Check if important classes are applied
    expect(container).toHaveClass(
      'h-auto',
      'min-h-[6.5rem]',
      'bg-[#3d081b]',
      'bg-opacity-5',
      'rounded-lg'
    );
  });

  it('renders with empty data', () => {
    render(<Cards data="" />);
    // Component should render even with empty data
    const container = document.querySelector('div.w-full');
    expect(container).toBeInTheDocument();
  });
});
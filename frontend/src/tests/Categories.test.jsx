import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Categories from '../components/Categories';

// Mock data for testing
const mockData = {
    _id: '123',
    name: 'Test Item',
    description: 'This is a test description for the item',
    price: '$19.99',
    img: 'test-image.jpg'
};

// Wrapper component to provide router context
const renderWithRouter = (ui) => {
    return render(ui, { wrapper: BrowserRouter });
};

describe('Categories Component', () => {
    it('renders all product information correctly', () => {
        renderWithRouter(<Categories data={mockData} />);
        
        // Check if all text content is rendered
        expect(screen.getByText(mockData.name)).toBeInTheDocument();
        expect(screen.getByText(mockData.description)).toBeInTheDocument();
        expect(screen.getByText(mockData.price)).toBeInTheDocument();
    });

    it('renders image with correct attributes', () => {
        renderWithRouter(<Categories data={mockData} />);
        
        const image = screen.getByAltText(mockData.name);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockData.img);
        expect(image).toHaveClass('h-full', 'w-full', 'object-cover');
    });

    it('creates correct link with product ID', () => {
        renderWithRouter(<Categories data={mockData} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/menu/${mockData._id}`);
    });

    it('applies correct styling classes to container', () => {
        renderWithRouter(<Categories data={mockData} />);
        
        const container = screen.getByRole('link').firstChild;
        expect(container).toHaveClass(
            'w-full',
            'text-[rgba(61,8,27,0.75)]'
        );
    });

    it('handles missing data gracefully', () => {
        const incompleteData = {
            _id: '123',
            name: 'Test Item',
            img: 'test-image.jpg'
        };

        renderWithRouter(<Categories data={incompleteData} />);
        
        // Should render without crashing
        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(screen.getByAltText('Test Item')).toBeInTheDocument();
    });

    it('maintains responsive classes', () => {
        renderWithRouter(<Categories data={mockData} />);
        
        const imageContainer = screen.getByRole('img').parentElement;
        expect(imageContainer).toHaveClass(
            'h-[200px]',
            'md:h-[50%]',
            'w-full'
        );
    });
});
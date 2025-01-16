import { render, screen } from '@testing-library/react';
import TestimonialsGrid, { TestimonialCard } from '../components/Testimonials';

// Mock antd Carousel component
jest.mock('antd', () => ({
  Carousel: ({ children }) => <div data-testid="mock-carousel">{children}</div>
}));

// Mock test data
const mockTestimonials = [
  {
    img: '/test-image-1.jpg',
    name: 'John Doe',
    avtext: 'JD',
    date: '2024-01-15',
    testimonial: 'This is a great test testimonial.'
  },
  {
    img: '/test-image-2.jpg',
    name: 'Jane Smith',
    avtext: 'JS',
    date: '2024-01-16',
    testimonial: 'Another excellent testimonial.'
  }
];

describe('TestimonialCard Component', () => {
  const mockData = mockTestimonials[0];

  it('renders individual card correctly', () => {
    render(<TestimonialCard data={mockData} />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.testimonial)).toBeInTheDocument();
    expect(screen.getByText(mockData.avtext)).toBeInTheDocument();
    expect(screen.getByText(mockData.date)).toBeInTheDocument();

    const image = screen.getByAltText(`${mockData.name}'s testimonial`);
    expect(image).toHaveAttribute('src', mockData.img);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('applies hover and transition styles', () => {
    render(<TestimonialCard data={mockData} />);

    const card = screen.getByRole('article');
    expect(card).toHaveClass(
      'transform',
      'transition-transform',
      'hover:scale-[1.02]'
    );
  });
});

describe('TestimonialsGrid Component', () => {
  describe('Desktop View', () => {
    it('renders grid layout for desktop screens', () => {
      window.matchMedia.mockImplementation(query => ({
        matches: query === '(min-width: 768px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      render(<TestimonialsGrid testimonials={mockTestimonials} />);
      
      const desktopGrid = screen.getByTestId('testimonials-grid');
      expect(desktopGrid).toBeInTheDocument();
      expect(desktopGrid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3');
    });
  });

  describe('Mobile View', () => {
    it('renders carousel for mobile screens', () => {
      window.matchMedia.mockImplementation(query => ({
        matches: query !== '(min-width: 768px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      render(<TestimonialsGrid testimonials={mockTestimonials} />);
      
      const carousel = screen.getByTestId('mock-carousel');
      expect(carousel).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('displays message when no testimonials are provided', () => {
      render(<TestimonialsGrid testimonials={[]} />);
      expect(screen.getByText('No testimonials available')).toBeInTheDocument();
    });

    it('handles undefined testimonials gracefully', () => {
      render(<TestimonialsGrid testimonials={undefined} />);
      expect(screen.getByText('No testimonials available')).toBeInTheDocument();
    });
  });
});
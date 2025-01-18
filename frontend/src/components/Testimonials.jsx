
import { Carousel } from 'antd';

export const TestimonialCard = ({ data }) => {
  const { img, name, avtext, date, testimonial } = data;
  
  return (
    <article className="w-full bg-[#f5eff5] h-[24rem] sm:h-auto  text-[rgba(61,8,27,0.75)] overflow-hidden rounded-lg shadow-sm transform transition-transform hover:scale-[1.02]">
      {/* Image Container */}
      <div className="relative pt-[75%] bg-gray-100">
        <img 
          className="absolute inset-0 w-full h-full object-cover"
          src={img}
          alt={`${name}'s testimonial`}
          loading="lazy"
          decoding="async"
        />
        
        {/* Avatar Circle */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 text-sm md:text-base font-medium bg-white rounded-full shadow-md border-2 border-gray-100">
            {avtext}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative px-4 pt-10 pb-6 md:px-6">
        <div className="text-center space-y-3">
          <div>
            <h3 className="text-lg font-bold text-[#3d081bbf]">
              {name}
            </h3>
            <time className="text-xs text-gray-500 font-medium" dateTime={date}>
              {date}
            </time>
          </div>

          {/* Testimonial Text */}
          <div className="relative">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {testimonial}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

const TestimonialsGrid = ({ testimonials }) => {
    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              zIndex: 1,
              color: '#3d081b',  // Custom arrow color
              fontSize: '30px',   // Big arrow size
              padding:'2px 4px',
              margin:"10px",
               // Adjust padding to make arrows easier to click
            }}
            onClick={onClick}
          >
          
          </div>
        );
      };
      
      const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: 'relative',
              zIndex: 1,
              color: '#3d081b',  // Custom arrow color
              fontSize: '30px',   // Big arrow size
               padding:'2px 4px',
              margin:"10px",
            }}
            onClick={onClick}
          >
            
          </div>
        );
      };
  if (!testimonials?.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        No testimonials available
      </div>
    );
  }

  return (
    <section id='testimonials' >
      {/* Grid layout for md+ screens */}
      <div className="hidden md:block w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div data-testid="testimonials-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-20 h-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} data={testimonial} />
          ))}
        </div>
      </div>

      {/* Carousel layout for smaller screens */}
      <div className="md:hidden bg-[rgba(61,8,27,0.75)] relative">
        <Carousel 
          arrows 
          autoplay 
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
        >
          {testimonials.map((item, index) => (
            <div key={index} className="px-4 py-8">
              <TestimonialCard data={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsGrid;
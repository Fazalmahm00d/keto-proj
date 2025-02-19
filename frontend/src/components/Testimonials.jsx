
import { Carousel } from 'antd';

export const TestimonialCard = ({ data }) => {
  const { img, name, avtext, date, testimonial } = data;
  
  return (
    <article className="w-full bg-[#f5eff5] h-[24rem] sm:h-auto  text-[rgba(61,8,27,0.75)] overflow-hidden rounded-lg shadow-sm transform transition-transform hover:scale-[1.02]  p-4 md:p-0">
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
          <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 text-sm lg:text-lg font-medium bg-white rounded-full shadow-md border-2 lg:border-4 border-gray-100">
            {avtext}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative px-4 pt-10 pb-6 md:px-6 text-[rgba(61,8,27,0.75)]">
        <div className="text-center space-y-3">
          <div>
            <h3 className="text-lg lg:text-2xl font-bold ">
              {name}
            </h3>
            <time className="text-xs lg:text-sm  font-medium" dateTime={date}>
              {date}
            </time>
          </div>

          {/* Testimonial Text */}
          <div className="relative">
            <p className="text-sm lg:text-xl  leading-relaxed line-clamp-3">
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
      <div className="hidden md:block container max-w-7xl lg:mx-auto lg:px-0 w-full md:px-[50px]">
        <div data-testid="testimonials-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[20px] h-auto">
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
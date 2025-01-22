import Header from './Header';
import MainSection from './MainSection';
import Cards from './Cards';
import Category from './Category';
import Categories from './Categories'
import Banner from './Banner';
import Description from './Description';
import LocBanner from './LocBanner';
import Mail from './Mail';
import Footer from './Footer';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../lib/productapi';
import TestimonialsGrid from './Testimonials';
import CategoriesLoadingFallback from '../fallbackloading/CategoryLoader';
import { Helmet } from 'react-helmet';



function Main() {
  const { data: productData, isLoading, isError } = useQuery({
    queryKey: ["get all products data"],
    queryFn: () => getAllProducts(),
    select: (data) => {
      const products = data?.data?.products || [];
      const shuffled = [...products];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const selected = shuffled.slice(0, 4);
      return selected;
    }
  });
  
  const testdata=[
    {
      img:"https://images.loox.io/uploads/2023/4/21/1DQjqNfAx.jpg",avtext:"HG", name:"Henriette G." ,date:"4/21/2023",testimonial:"Great we user it for my birthday cake. Delicious cake."
    },
    {
      img:"https://img.freepik.com/free-photo/smiling-man-sitting-cafe-table-gesturing_1262-1141.jpg?uid=R48205179&ga=GA1.1.247687857.1691161183&semt=ais_hybrid", avtext:"MS", name:" Henry S.", date:"4/21/2023", testimonial:"Best keto Pizza in the city"
    },
    {
      img:"https://img.freepik.com/free-photo/enthusiastic-city-girl-shows-thumbs-up-approval-looking-upbeat-say-yes-approves-agrees-stands_1258-125720.jpg?uid=R48205179&ga=GA1.1.247687857.1691161183&semt=ais_hybrid", avtext:"NB", name:"Natalia B." ,date:"4/21/2023", testimonial:"Ordered the tiramisu cupcakes for the first time for a work event and they were a hit! So tasty,... "
    }
  ]

  return (
    <div className='relative'>
       <Helmet>
        <title>Home | My Awesome Website</title>
        <meta name="description" content="Welcome to My Awesome Website!" />
      </Helmet>
      <Header className='sticky'/>
      <MainSection />
 
      <div className='flex flex-col md:flex-row w-full justify-center min-h-[200px] items-center px-4 md:px-[50px] py-8 gap-4'>
        <Cards data="Order Now, Enjoy Keto Tonight!"/>
        <Cards data="Transparency You Can Trust: Every Ingredient Listed"/>
        <Cards data="Safe for Diabetes, Celiac, and Keto-Lovers Alike!"/>
      </div>

      <div className='flex flex-col w-full justify-center h-auto px-4 py-10 md:p-[50px] items-center'>
        <div className='text-2xl md:text-4xl m-6 md:m-10 font-bold text-[rgba(61,8,27,0.75)]'>
          Most Loved
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-4 w-full h-full gap-6 md:gap-20  md:px-20">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CategoriesLoadingFallback key={index} />
          ))
        ) : (
          productData?.map((items) => (
            <Categories key={items.id} data={items} />
          ))
        )}
        </div>
      </div>

      <div className='md:flex md:flex-col w-full justify-center md:min-h-screen px-4 md:p-[50px] items-center pb-10'>
        <h1 className='text-2xl md:text-4xl text-center m-6 md:m-10 font-bold text-[rgba(61,8,27,0.75)]'>
          Our Customers
        </h1>
        <TestimonialsGrid testimonials={testdata} />
      </div>

      <div className='flex flex-col w-full justify-center min-h-[600px] px-4 md:p-[50px] items-center bg-[#f5eff5] py-10'>
        <div className='text-2xl md:text-4xl font-bold text-[rgba(61,8,27,0.75)] m-6 md:m-10 text-center '>
          Browse By Category
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full justify-center items-center gap-6 md:gap-[20px]  md:px-[50px]'>
          <Category 
            img="https://www.ketodelia.ca/cdn/shop/products/AlmondFlourWaffles.jpg?v=1673029390&width=535" 
            data="All Day Keto Breakfast"
          />
          <Category 
            img="https://www.ketodelia.ca/cdn/shop/products/CreamyMushroomFettuccineAlfredo.jpg?v=1673029366&width=535" 
            data="Keto Pastas"
          />
          <Category 
            img="https://www.ketodelia.ca/cdn/shop/products/ketogardenveggiepizza.jpg?v=1673293248&width=535" 
            data="Keto Pizzas"
          />
          <Category 
            img="https://www.ketodelia.ca/cdn/shop/products/KetoChickenTenders.jpg?v=1673029425&width=535" 
            data="Keto Mains"
          />
        </div>
      </div>

      <Banner />
      <Description />
      <LocBanner />
      <Mail />
      <Footer />
    </div>
  );
}

export default Main;

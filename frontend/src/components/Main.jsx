
import Header from './Header';
import MainSection from './MainSection';
import Cards from './Cards';
import Category from './Category';
import Categories from './Categories'
import Testimonials from './Testimonials';
import Banner from './Banner';
import Description from './Description';
import LocBanner from './LocBanner';
import MenuItems from './MenuItems';
import Mail from './Mail';
import Footer from './Footer';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../lib/productapi';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';




function Main(props) {
  const [menuItems, setMenuItems] = useState()
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
      console.log(selected);
      return selected;
    }
  });
  
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
  
  
  const data1=[
      {
      img:'https://www.ketodelia.ca/cdn/shop/products/cauliflowerbites.jpg?v=1673029354&width=360',
      head:"Air Fried Keto Buffalo Cauliflower Bites", 
      descr:"Lightly battered organic cauliflower tossed in homemade buffalo sauce with your choice of homemade keto dressing. Air Fried.",
      price:"$13.95"
      },
      { img:"https://www.ketodelia.ca/cdn/shop/products/ketochickensoup.jpg?v=1673029356&width=360" ,
          head:"Keto Chicken Soup" ,
          descr:"Our Keto Chicken Soup is made with homemade organic farmers chicken and cauliflower rice. Not only is it ultra-comforting and delicious, but it's low carb and full of beneficial nutrients. Great for the whole family!",
           price:"$12.95"
      },
      {
          img:"https://www.ketodelia.ca/cdn/shop/products/NoSugarCheesecake.jpg?v=1673029341&width=360",
           head:"Keto Cheesecake" ,
           descr:"A classic cheesecake, made Keto-friendly. Deliciously rich and creamy with a crumbly almond flour crust, it’s full of natural flavors and goodness from butter, eggs, and cream cheese — no sugar added! Sweetened naturally with erythritol." ,
           price:"$12.50"
      },
      {
          img:"https://www.ketodelia.ca/cdn/shop/products/KetoBagelsCheddarJalapeno.jpg?v=1679087800&width=360",
          head:"Keto Bagel Cheddar Jalapeno - 4 pack",
          descr:"Our cheddar jalapeno bagels are made of almond flour, mozzarella and cream cheese. They are gluten free, sugar free and delicious! Pack of 4.",
          price:"$23.95",
  
      }
  ]
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
  useEffect(()=>{

  },[])
  return (
    <div className='relative'>
 <Header className='sticky' Authenticator={props.isAuthenticate} setIsAuthenticate={props.setIsAuthenticate} />
 <MainSection />
 
 <div className='flex flex-col md:flex-row w-full justify-center min-h-[200px] items-center px-4 md:px-[50px] py-8 gap-4'>
   <Cards data="Order Now, Enjoy Keto Tonight!"/>
   <Cards data="Transparency You Can Trust: Every Ingredient Listed"/>
   <Cards data="Safe for Diabetes, Celiac, and Keto-Lovers Alike!"/>
 </div>

 <div className='flex flex-col w-full justify-center min-h-[680px] px-4 md:px-[50px] items-center'>
   <div className='text-2xl md:text-4xl m-6 md:m-10 font-bold text-[rgba(61,8,27,0.75)]'>
     Most Loved
   </div>
   <div className='grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-4 w-full h-full gap-6 md:gap-20 px-4 md:px-20'>
     {productData?.map((items) => (
       <Categories key={items.id} data={items}/>
     ))}
   </div>
 </div>

 <div className='w-full justify-center md:min-h-screen p-10 md:p-[50px] items-center py-20'>
   <h1 className='text-2xl md:text-4xl text-center m-6 md:m-10 font-bold text-[rgba(61,8,27,0.75)]'>
     Our Customers
   </h1>
  <div className='hidden md:grid md:grid-cols-3 lg:grid-cols-3 w-full items-center justify-center md:gap-10  lg:gap-40 px-4 md:px-10'>
  {testdata.map((items) => (
        <Testimonials key={items.id} data={items} />
      ))}

  </div>
  <div className='block sm:block md:hidden bg-blue-300 relative'>
    <Carousel arrows  autoplay  prevArrow={<CustomPrevArrow />}
  nextArrow={<CustomNextArrow />} >
      {testdata.map((items) => (
        <Testimonials key={items.id} data={items} />
      ))}
    </Carousel>
  </div>

 </div>

 <div className='flex flex-col w-full justify-center min-h-[600px] items-center bg-[#f5eff5] py-8'>
   <div className='text-2xl md:text-4xl font-bold text-[rgba(61,8,27,0.75)] mb-8 text-center px-4'>
     Browse By Category
   </div>
   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full justify-items-center gap-6 md:gap-[20px] px-4 md:px-[50px]'>
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

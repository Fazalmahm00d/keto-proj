
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


function Main(props) {
  const data=[
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
  return (
    <div className='relative'>
      <Header className='sticky' Authenticator={props.isAuthenticate} setIsAuthenticate={props.setIsAuthenticate}></Header>
      <MainSection></MainSection>
      <div className='flex w-full justify-center h-[200px]  items-center px-[50px]'>
      <Cards data="Order Now, Enjoy Keto Tonight!"/>
      <Cards data="Transparency You Can Trust: Every Ingredient Listed"/>
      <Cards data="Safe for Diabetes, Celiac, and Keto-Lovers Alike!"/>
      </div>
      <div className='flex flex-col w-full justify-center h-[680px] px-[50px] items-center'>
        <div className='text-4xl font-bold text-[rgba(61,8,27,0.75)] '>Most Loved</div>
        <div className='flex justify-center items-center w-full h-[100%] gap-[20px]'>
         {
          data.map((items)=>{
            return <Categories data={items}/>
          })
         }
        </div>
      </div>
      <div className='flex w-full justify-center h-[600px] p-[50px] items-center'>
        <div className='flex justify-center items-center mt-10 gap-[30px]'>
        {
          testdata.map((items)=>{
            return <Testimonials data={items}/>
          })
         }
        </div>
      </div>
        <div className='flex flex-col w-full justify-center h-[600px] items-center bg-[#f5eff5]'>
          <div className='text-4xl font-bold text-[rgba(61,8,27,0.75)] '>Browse By Category</div>
          <div className='flex w-100 justify-center items-center gap-[20px]'>
          <Category img="https://www.ketodelia.ca/cdn/shop/products/AlmondFlourWaffles.jpg?v=1673029390&width=535" data="All Day Keto Breakfast"></Category>
          <Category img="https://www.ketodelia.ca/cdn/shop/products/CreamyMushroomFettuccineAlfredo.jpg?v=1673029366&width=535" data="Keto Pastas"></Category>
          <Category img="https://www.ketodelia.ca/cdn/shop/products/ketogardenveggiepizza.jpg?v=1673293248&width=535" data="Keto Pizzas"></Category>
          <Category img="https://www.ketodelia.ca/cdn/shop/products/KetoChickenTenders.jpg?v=1673029425&width=535" data="Keto Mains"></Category>
          </div>

      </div>
      <Banner></Banner>
      <Description></Description>
      <LocBanner></LocBanner>
      <Mail></Mail>
      <Footer></Footer>
    </div>
    
  );
}

export default Main;

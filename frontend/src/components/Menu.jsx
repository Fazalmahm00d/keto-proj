import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { getAllProducts } from "../lib/productapi";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import LoadingFallback from "../fallbackloading/ProductLoader";
import { Helmet } from "react-helmet";

function Menu(props) {
  const [menuItems, setMenuItems] = useState({
    appetizers: [],
    breakfastItems: [],
    salads: [],
    mainDishes: []
  });

  const { data: productData, isLoading: productDataLoading, isError: productDataError } = useQuery({
    queryKey: ["get all products data"],
    queryFn: () => getAllProducts(),
   
  });

  useEffect(() => {
    if (productData) {
      const products = productData.data.products;
      setMenuItems({
        appetizers: products.filter(item => item.category === 'appetizer'),
        breakfastItems: products.filter(item => item.category === 'breakfast'),
        salads: products.filter(item => item.category === 'salad'),
        mainDishes: products.filter(item => item.category === 'main')
      });
    }
  }, [productData]);

  if (productDataLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <LoadingFallback key={index} />
        ))}
      </div>
    ); }
  if (productDataError) return <div>Error: {error}</div>;

  return (
    <div>
       <Helmet>
        <title>Menu | My Awesome Website</title>
        <meta name="description" content="Welcome to My Awesome Website!" />
      </Helmet>

      <Header/>
      <div className="flex justify-center ">
        <div className='container max-w-7xl lg:mx-auto lg:px-0 h-auto p-4 md:p-[20px] flex flex-col items-start w-full '>
          <h1 className='font-bold text-xl md:text-2xl ml-4 md:ml-8 mb-4'>Appetizers</h1>
          <div className='mb-10  w-full grid grid-cols-1 md:grid-cols-2   lg:grid-cols-3 justify-content-around  gap-4 lg:gap-8 '>
            {menuItems.appetizers.map((item) => {
              return <ProductCard key={item.id} data={item} />;
            })}
          </div>
          
          <h1 className='font-bold text-xl md:text-2xl ml-4 md:ml-8 mb-4'>Keto Breakfast</h1>
          <div className='mb-10  w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-content-around  gap-4 lg:gap-8 '>
            {menuItems.breakfastItems.map((item) => {
              return <ProductCard key={item.id} data={item} />;
            })}
          </div>

          <h1 className='font-bold text-xl md:text-2xl ml-4 md:ml-8 mb-4'>Salads</h1>
          <div className='mb-10  w-full  grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3  justify-content-around  gap-4 lg:gap-8 '>
            {menuItems.salads.map((item) => {
              return <ProductCard key={item.id} data={item} />;
            })}
          </div>

          <h1 className='font-bold text-xl md:text-2xl ml-4 md:ml-8 mb-4'>Keto Mains</h1>
          <div className='mb-10  w-full grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 justify-content-around gap-4 lg:gap-8 '>
            {menuItems.mainDishes.map((item) => {
              return <ProductCard key={item.id} data={item} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;

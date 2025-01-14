import Header from "./Header";
import Footer from "./Footer";
import MenuItems from "./MenuItems";
import { useEffect, useState } from "react";
import { getAllProducts } from "../lib/productapi";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

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
    onSuccess: (res) => {
      console.log(res, "response in product")
    }
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

  if (productDataLoading) return <div>Loading...</div>;
  if (productDataError) return <div>Error: {error}</div>;

  return (
    <div>
      <Header Authenticator={props.isAuthenticate} setIsAuthenticate={props.setIsAuthenticate}></Header>
      <div className="flex justify-center">
        <div className='h-auto p-[20px] md:p-[10px] flex flex-col items-start w-full md:w-[80%]'>
          <h1 className='font-bold text-2xl ml-8 mb-4'>Appetizers</h1>
          <div className='w-full grid grid-cols-1   lg:grid-cols-2 2xl:grid-cols-3 justify-content-around  gap-2 sm:gap-4 lg:gap-8 '>
            {menuItems.appetizers.map((item) => {
              return <ProductCard key={item.id} data={item} />;
            })}
          </div>
          
          <h1 className='font-bold text-2xl ml-8 mb-4'>Keto Breakfast</h1>
          <div className='w-full  grid grid-cols-1   lg:grid-cols-2 2xl:grid-cols-3 justify-content-around  gap-2 sm:gap-4 lg:gap-8 '>
            {menuItems.breakfastItems.map((item) => {
              return <ProductCard key={item.id} data={item} />;
            })}
          </div>

          <h1 className='font-bold text-2xl ml-8 mb-4'>Salads</h1>
          <div className='w-full  grid grid-cols-1   lg:grid-cols-2 2xl:grid-cols-3  justify-content-around  gap-2 sm:gap-4 lg:gap-8 '>
            {menuItems.salads.map((item) => {
              return <ProductCard key={item.id} data={item} />;
            })}
          </div>

          <h1 className='font-bold text-2xl ml-8 mb-4'>Keto Mains</h1>
          <div className='w-full grid grid-cols-1   lg:grid-cols-2 2xl:grid-cols-3 justify-content-around gap-2 sm:gap-4 lg:gap-8 '>
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

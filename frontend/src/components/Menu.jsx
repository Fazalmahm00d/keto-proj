import Header from "./Header";
import Footer from "./Footer";
import MenuItems from "./MenuItems";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllProducts } from "../lib/productapi";
import { useQuery } from "@tanstack/react-query";

function Menu(props){
  const [menuItems, setMenuItems] = useState({
    appetizers: [],
    breakfastItems: [],
    salads: [],
    mainDishes: []
});
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

const {data:productData,isLoading:productDataLoading,isError:productDataError}=useQuery({
  queryKey:["get all products data"],
  queryFn:()=>getAllProducts(),
  onSuccess:(res)=>{
      console.log(res,"response in product")
  }
})

useEffect(()=>{
  if(productData){
    const products = productData.data.products;
            setMenuItems({
                appetizers: products.filter(item => item.category === 'appetizer'),
                breakfastItems: products.filter(item => item.category === 'breakfast'),
                salads: products.filter(item => item.category === 'salad'),
                mainDishes: products.filter(item => item.category === 'main')
  })}
},[productData])
//   useEffect(() => {
//     const fetchItems = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get('http://localhost:8000/api/products');
//             const products = response.data.products;

//             setMenuItems({
//                 appetizers: products.filter(item => item.category === 'appetizer'),
//                 breakfastItems: products.filter(item => item.category === 'breakfast'),
//                 salads: products.filter(item => item.category === 'salad'),
//                 mainDishes: products.filter(item => item.category === 'main')
//             });
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchItems();
// }, []);
if (productDataLoading) return <div>Loading...</div>;
if (productDataError) return <div>Error: {error}</div>;
  
    return(
    <div>
        <Header Authenticator={props.isAuthenticate} setIsAuthenticate={props.setIsAuthenticate}></Header>
        <div className="flex justify-center ">
          <div className='h-100 p-[30px] flex flex-col items-start  w-[80%]  '>
         <h1 className='font-bold text-2xl ml-8'>Appetizers</h1>
         <div className='grid grid-cols-2 gap-10 p-[30px]'>
         {
          menuItems.appetizers.map((items)=>{
            return <MenuItems data={items}/>
          })
         }
         </div>
         <h1 className='font-bold text-2xl ml-8 '>Keto Breakfast</h1>
         <div className='grid grid-cols-2 gap-10 p-[30px]'>
         {
          menuItems.breakfastItems.map((items)=>{
            return <MenuItems data={items}/>
          })
         }
         </div>
         <h1 className='font-bold text-2xl ml-8 '>Salads</h1>
         <div className='grid grid-cols-2 gap-10 p-[30px]'>
         {
          menuItems.salads.map((items)=>{
            return <MenuItems data={items}/>
          })
         }
         </div>
         <h1 className='font-bold text-2xl ml-8 '>Keto Mains</h1>
         <div className='grid grid-cols-2 gap-10 p-[30px]'>
         {
          menuItems.mainDishes.map((items)=>{
            return <MenuItems data={items}/>
          })
         }
         </div>
        </div>
        </div>
        <Footer></Footer>
    </div>
    )
}

export default Menu;
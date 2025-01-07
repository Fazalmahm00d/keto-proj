import { useContext, useEffect, useState } from "react"
import { CartContext } from "./contextAPI"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { dataAction } from "../ReduxStore/dataCart"
import { useQuery } from "@tanstack/react-query"
import { getCartItem } from "../lib/cartapi"


function Cart(){
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const cartItems=useSelector((state)=>state.dataReducer.cartItems)
    const [cart,setCart]=useState();
    const [totalExpenses, setTotalExpenses] = useState(0);
    const{data:cartData,isLoading:cartDataLoading,isError:cartDataError}=useQuery({
      queryKey:["get cart data"],
      queryFn:()=>getCartItem(isEmail),
      enabled:!!isEmail
    })

    // async function getCartItem(){
    //     try {
    //         const response = await axios.get(`http://localhost:8000/user/${isEmail}/cart`, {
    //           withCredentials: true, // If your API uses cookies for authentication
    //         });
        
    //         // The populated cart data
    //         const cart = response.data.cart;
    //         console.log("Cart fetched successfully:", cart);
    //         setCart(cart)
    //         const total = cart.reduce(
    //             (sum, item) => sum + item.productId.price * item.quantity,
    //             0
    //           );
    //           setTotalExpenses(total.toFixed(2));
    //         return cart; // Return the cart for further use
    //       } catch (error) {
    //         console.error("Error fetching cart:", error.response?.data || error.message);
    //         return null; // Handle error gracefully
    //       }
    // }

    
    
   
    // useEffect(()=>{
    //     getCartItem();
    // },[]) 
        
    useEffect(()=>{
      if(cartData){
        setCart(cartData)
        const total = cartData.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
          );
          setTotalExpenses(total.toFixed(2));
      }
    },[cartData])
    return(
        <div className="absolute top-0 left-0 flex justify-center items-center h-[100vh] w-full bg-neutral-500 bg-opacity-[0.5]">
            <div className="bg-white p-8 w-[30%]">
            <div className="text-xl font-bold ">Your Cart</div>
            <div className="h-[25rem] overflow-y-scroll p-2">
            {cartData?.map((item) => (
          <div key={item._id} className="flex justify-between items-center text-base mt-3">
            <div className="flex gap-4">
              <img
                src={item.productId.img}
                alt={item.productId.name}
                className="w-[50px] h-[50px] object-cover rounded"
              />
              <div>
                <h3 className="font-bold">{item.productId.name}</h3>
                <p>Category: {item.productId.category}</p>
                <p>Price: ${item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
            </div>
            <div className="flex font-700 mt-5">
              Total Expenses: ${totalExpenses}  
            </div>
            <div className="flex gap-2 mt-3 w-full">
            <Link to="/menu" className="w-[50%]"><button className="w-full bg-red-700 text-white p-3 rounded">Back to menu</button></Link>
            <button className="w-[50%] bg-green-700 text-white p-3 rounded">Buy Now</button>
            </div>
            </div>

        </div>
    )
}

export default Cart
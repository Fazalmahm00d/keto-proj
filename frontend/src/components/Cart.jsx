import { useContext, useEffect, useState } from "react"
import { CartContext } from "./contextAPI"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { dataAction } from "../ReduxStore/dataCart"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteItem, getCartItem } from "../lib/cartapi"


function Cart(){
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const [cart,setCart]=useState();
    const [showToast, setShowToast] = useState(false);
    const queryClient=useQueryClient();
    const [totalExpenses, setTotalExpenses] = useState(0);
    const{data:cartData,isLoading:cartDataLoading,isError:cartDataError}=useQuery({
      queryKey:["get cart data"],
      queryFn:()=>getCartItem(isEmail),
      enabled:!!isEmail
    })

    
    function deleteHandler(id){
      const obj={
        isEmail,
        id
      }
      if(!deleteMutate.isPending){
        deleteMutate.mutate(obj)
      }
    }

    const deleteMutate=useMutation( {
      mutationFn:deleteItem,
      onSuccess:()=>{
        console.log("deleted item")
        queryClient.invalidateQueries(["get cart data", isEmail])
        setShowToast(true);

      // Hide the toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
      },
      onError:(error)=>{
        console.error("err:", error)

    }

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
          {showToast && (
         <div className="fixed toast toast-top toast-end">
         <div className="alert alert-success shadow-lg flex items-center gap-2">
           {/* Success Icon */}
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-6 w-6 text-white"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
             />
           </svg>
           {/* Message */}
           <span className="font-semibold text-white">Item deleted successfully!</span>
           {/* Close Button */}
           <button
             className="btn btn-xs btn-circle btn-outline text-white hover:bg-green-100"
             onClick={() => setShowToast(false)} // Replace with your close logic
           >
             ✕
           </button>
         </div>
       </div>
      )}
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
            <div className="flex items-center gap-4">
            <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
            { deleteMutate.isLoading?<svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        :<button  onClick={()=>deleteHandler(item)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg></button>}
            </div>
          </div>
        ))}
            </div>
            <div className="flex font-700 mt-5">
              Total Expenses:<span className="font-bold"> ${totalExpenses}  </span>
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
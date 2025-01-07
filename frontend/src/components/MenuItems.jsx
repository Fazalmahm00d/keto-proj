import { useContext, useState } from 'react';
import { CartContext } from './contextAPI';
import { Link } from 'react-router-dom';
import { data } from 'autoprefixer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { dataAction } from '../ReduxStore/dataCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCart } from '../lib/cartapi';


function MenuItems(props){
    const dispatch=useDispatch();
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const [showToast, setShowToast] = useState(false);
    
    const queryClient = useQueryClient();
    const cartMutate = useMutation({
        mutationFn: updateCart,
        onSuccess: (response) => {
            // Invalidate to trigger a refetch
            queryClient.invalidateQueries(["get cart data"]);
            
            // If you have the cart data in the response
            if (response?.data?.user?.cart) {
                dispatch(dataAction.setCartArr(response.data.user.cart));
                console.log("calling on successs ")
                // Optionally update the query data immediately
                queryClient.setQueryData(["get cart data"], response.data.user.cart);
                setShowToast(true);

      // Hide the toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
                
            }
        },
        onError: (error) => {
            console.error("Cart update error:", error);
        }
    });
    async function sendToFb(id){
        const obj={
            isEmail,
            newCartItem:{
                productId: id,
                quantity:1
            }
        }
        cartMutate.mutate(obj)
    }   
    return(
        <Link to={`/menu/${props.data._id}`}>
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
          <span className="font-semibold text-white">Item added successfully!</span>
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
        <div className="flex justify-center  h-[18rem] w-[540px] border-2 border-gray-300 p-2">
            <div className="w-[70%] text-[#3d081b] text-base relative p-4">
                <div className='border-2 border-gray-100 text-white bg-green-800 rounded-lg text-base text-center'></div>
                <div className="text-xl mt-3">{props.data.name} </div>
                <p className="font-light mt-2">{props.data.desc} </p>
                <div className="font-bold mt-5">${props.data.price}</div>
                <button onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    sendToFb(props.data._id)
                    }} className="border-2 border-gray-900 rounded-3xl p-3 text-base absolute bottom-1">Add to Order</button>
            </div>
            <div className="w-[30%] border-2 rounded-lg overflow-hidden">
                <img className="h-full .max-w-full " src={props.data.img} alt="" />
            </div>
        </div>
        
        </Link>
    )
}

export default MenuItems;
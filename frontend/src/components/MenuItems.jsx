import { useContext } from 'react';
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
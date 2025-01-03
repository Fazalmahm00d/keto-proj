import { useContext } from 'react';
import { CartContext } from './contextAPI';
import { Link } from 'react-router-dom';
import { data } from 'autoprefixer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { dataAction } from '../ReduxStore/dataCart';


function MenuItems(props){
    const dispatch=useDispatch();
    const MyContextData=useContext(CartContext);
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate);
    
    async function sendToFb(id){
        const newCartItem = {
            productId: id,
            quantity:1
        }
        console.log(newCartItem,"items before sending")
        try {
            const response = await axios.post(`http://localhost:8000/user/${isEmail}/cart`, newCartItem)
            console.log(response)
            dispatch(dataAction.setCartArr(response.data.user.cart))
        } catch(error) {
            console.error("err:", error)
        }
    }   
    return(
        <Link to={`/menu/${props.data._id}`}>
        <div className="flex justify-center  h-[18rem]  border-2 border-gray-300 p-2">
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
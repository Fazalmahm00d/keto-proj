import axios from "axios";
import { createContext, useState } from "react";


export const CartContext = createContext();
const CartProvider = (props) => {
    const [cartitems, setCartItems] = useState([]);
    const [isEmail,setIsEmail] = useState(localStorage.getItem('email'));
    const [isAuthenticate,setIsAuthenticate] = useState(localStorage.getItem('token'));
    async function getCartData() {
        try {
            // const response = await fetch(`https://fir-db-7355f-default-rtdb.firebaseio.com/${isEmail}.json`)
            // const data = await response.json();
            
            const response = await axios.get(`https://fir-db-7355f-default-rtdb.firebaseio.com/${isEmail}.json`)
            const data=response.data
            const arr=[]
            for(let key in data){
                arr.push({ id:key ,...data[key]});
            }
            setCartItems(arr)
        }
        catch (error) {
            console.log(error)
        }
    }
    const globalObject = {
        cartitems,
        setCartItems,
        getCartData,
        isEmail,
        setIsEmail,
        isAuthenticate,
        setIsAuthenticate
    }
    return (
        <CartContext.Provider value={globalObject} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;

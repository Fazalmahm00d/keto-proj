import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./contextAPI";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";
import { dataAction } from "../ReduxStore/dataCart";
import axios from "axios";
import Cookies from "js-cookie";

function Header(props) {
    const dispatch=useDispatch();
    const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate)
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const cartItems=useSelector((state)=>state.dataReducer.cartItems)
    const[length,setLength]=useState(0)
    // const MyContext=useContext(CartContext)
    // const arr=MyContext.cartitems;
    // let length=cartItems.length;
    async function LogOutHandler(){
      
      try {
        Cookies.remove("authToken"); // "Logged out successfully"
        // Redirect to login page or handle logout logic
      } catch (error) {
        console.error("Logout failed", error);
      }
      // MyContext.setIsAuthenticate(false);
      // MyContext.setIsEmail(undefined);
      dispatch(authAction.changeTokenValue(false));
      dispatch(authAction.changeEmailValue(undefined))
    }
    
  
    async function getCartItem(){
      try {
          const response = await axios.get(`http://localhost:8000/user/${isEmail}/cart`, {
            withCredentials: true, // If your API uses cookies for authentication
          });
      
          // The populated cart data
          const cart = response.data.cart;
          console.log("Cart fetched successfully:", cart);
          setLength(cart.length)
          dispatch(dataAction.setCartArr(cart))
        
          return cart; // Return the cart for further use
        } catch (error) {
          console.error("Error fetching cart:", error.response?.data || error.message);
          return null; // Handle error gracefully
        }
  }
  const showSessionExpiredPopup = () => {
    console.log("session expired");
    // Redirect to login
    window.location.href = "/login";
  };
    useEffect(()=>{
      getCartItem();
    },[isEmail,cartItems.length])
    
    useEffect(()=>{
      console.log(isEmail,"email value")
    console.log(isAuthenticate,"token value ")
    getCartItem()
    },[isAuthenticate])

    useEffect(() => {
      const checkSession = () => {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          showSessionExpiredPopup();
        }
      };
  
      const interval = setInterval(checkSession, 30000); // Check every 30s
  
      // Cleanup on unmount
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="w-full">
        <div className='banner bg-[rgba(100,13,152,1)] text-white w-full py-2 text-center '>
          Order now and enjoy instant delivery for orders over $25
        </div>
        
        <div className='flex bg-white justify-evenly items-center w-[100%] h-[100px]'>
          <Link to="/">
          <div>
            <img 
              src="//www.ketodelia.ca/cdn/shop/files/Ketodelia_Logo_1b.png?v=1664321580" 
              alt="Ketodelia Restaurant" 
              width="190" 
              height="70.68" 
              className="header__heading-logo" 
            />
          </div>
          </Link>
          <div>
            <ul className='flex gap-3 list-none text-[rgba(61,8,27,0.75)] font-600 '>
              <Link to="/menu"><li>Menu</li></Link>
              <li>FAQ</li>
              <Link to="/aboutus"><li>About</li></Link>
              <li>Gift cards</li>
              <Link to="/contact"><li>Contact</li></Link>
              <li>Locations</li>
            </ul>
          </div>
          <div className='flex items-center justify-center gap-4 text-[rgba(61,8,27,0.75)]'>
          
            <div className='w-[full] flex items-center'><a className='pointer hover:underline ' href="tel:+1416-623-0317">(416) 623-0317</a></div>
            <div className='flex items-center'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-search" viewBox="-4 -4 30 30">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <Link to="/login">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="-4 -4 30 30">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
            </Link>
            <Link to="/cart" className="relative">
            <svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-handbag" viewBox="-4 -4 30 30">
              <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z"/>
            </svg>
            <span class="absolute bottom-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{length}</span>
            </Link>
            </div>
              {
              isEmail &&
              <div>
                <button className="bg-green-600 text-white p-3 rounded" onClick={LogOutHandler}>Log Out</button>
              </div>
              }
          </div>
        </div>
      </div>
    );
  }

  export default Header;
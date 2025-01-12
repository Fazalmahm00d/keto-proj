import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./contextAPI";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";
import { dataAction } from "../ReduxStore/dataCart";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getCartItem } from "../lib/cartapi";
import { Toast } from "./Toast";

function Header(props) {
    const dispatch=useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate)
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const cartItems=useSelector((state)=>state.dataReducer.cartItems)
    const [toast, setToast] = useState({ message: "", type: "", isVisible: false });

    const[length,setLength]=useState(0)

    const handleToast = (message, type) => {
      setToast({ message, type, isVisible: true });
      setTimeout(() => setToast({ ...toast, isVisible: false }), 30000); // Hide toast after 3 seconds
    };
    async function LogOutHandler(){
      
      try {
        Cookies.remove("authToken"); // "Logged out successfully"
        // Redirect to login page or handle logout logic
        handleToast("Logged Out", "alert-success");
        setTimeout(() => setToast(false), 3000);
      } catch (error) {
        console.error("Logout failed", error);
      }
      // MyContext.setIsAuthenticate(false);
      // MyContext.setIsEmail(undefined);
      dispatch(authAction.changeTokenValue(false));
      dispatch(authAction.changeEmailValue(undefined))
    }
    const {
      data: cartData,
      isLoading: cartDataLoading,
      isError: cartDataError
    } = useQuery({
      queryKey: ["get cart data", isEmail], // Add isEmail to dependency array
      queryFn: () => getCartItem(isEmail),
      enabled:isEmail !== undefined,
      onError: (error) => {
          console.error("Error fetching cart data:", error);
          setLength(0); // Reset length on error
      },
      
      // Add some configuration for better UX
      staleTime: 30000, // Consider data fresh for 30 seconds
      cacheTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
  });
  
  
  const showSessionExpiredPopup = () => {
    handleToast("Session expired.Please login again", "alert-success");

    // Redirect to login
    window.location.href = "/login";
  };
    useEffect(()=>{
      if(cartData){
        setLength(cartData?.length)
      }
    },[cartData])
    
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
            <div className='banner hidden md:block bg-[rgba(100,13,152,1)] text-white w-full py-2 text-center text-sm md:text-base'>
              Order now and enjoy instant delivery for orders over $25
            </div>
            
            <div className='flex flex-col md:flex-row bg-white justify-between items-center w-full px-4 py-2 md:h-[100px] md:px-8'>
              <Link to="/" className="py-2">
                {toast.isVisible && (
                  <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, isVisible: false })}
                  />
                )}
                <img 
                  src="//www.ketodelia.ca/cdn/shop/files/Ketodelia_Logo_1b.png?v=1664321580" 
                  alt="Ketodelia Restaurant" 
                  width="150" 
                  height="56" 
                  className="md:w-[190px] md:h-[70.68px]" 
                />
              </Link>
      
              <button 
                className="md:hidden absolute right-4 top-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
      
              <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}>
                <ul className='flex flex-col md:flex-row gap-3 list-none text-[rgba(61,8,27,0.75)] font-600 items-center'>
                  <Link to="/menu"><li className="py-2 md:py-0">Menu</li></Link>
                  <li className="py-2 md:py-0">FAQ</li>
                  <Link to="/aboutus"><li className="py-2 md:py-0">About</li></Link>
                  <li className="py-2 md:py-0">Gift cards</li>
                  <Link to="/contact"><li className="py-2 md:py-0">Contact</li></Link>
                  <li className="py-2 md:py-0">Locations</li>
                </ul>
              </nav>
      
              <div className='flex flex-wrap items-center justify-center gap-4 text-[rgba(61,8,27,0.75)] mt-4 md:mt-0'>
                <div className='flex items-center'>
                  <a className='hover:underline text-sm md:text-base' href="tel:+1416-623-0317">(416) 623-0317</a>
                </div>
                
                <div className='flex items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                  
                  <Link to="/login">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                  </Link>
                  
                  <Link to="/cart" className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-handbag" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
                    </svg>
                    <span className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                      {length}
                    </span>
                  </Link>
                </div>
      
                {isEmail && (
                  <div>
                    <button className="bg-green-600 text-white px-3 py-2 rounded text-sm" onClick={LogOutHandler}>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      };
  


  export default Header;
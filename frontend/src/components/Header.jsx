import {  useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getCartItem } from "../lib/cartapi";
import { Toast } from "./Toast";
import SearchDropdown from "./SearchDropdown";

function Header() {
    const dispatch=useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate)
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const [toast, setToast] = useState({ message: "", type: "", isVisible: false });
    const [length,setLength]=useState(0);
    const [isInputVisible, setIsInputVisible] = useState(false);
  

    const handleSearchClick = () => {
      setIsInputVisible(!isInputVisible);
    };
  
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
      if(isEmail&& cartData){
        setLength(cartData?.length)
      }
      else{
        setLength(0)
      }
    },[cartData,isEmail])
    
    useEffect(()=>{
    getCartItem()
    },[isAuthenticate])
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling
    }, [pathname]);

    useEffect(() => {
      const checkSession = () => {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          showSessionExpiredPopup();
        }
      };
  
      const interval = setInterval(checkSession, 3600000); // Check every 30s
      return () => clearInterval(interval);
    }, []);

    
  return (
    <div className="w-full">
      <div className='banner hidden md:block bg-[rgba(100,13,152,1)] text-white w-full py-2 text-center text-sm md:text-base'>
          Order now and enjoy instant delivery for orders over $25
      </div>
            
      <div className='flex flex-col my-4  md:flex-row bg-white justify-between items-center w-full px-4 py-2 md:h-[100px] md:px-8'>
        <Link to="/" className="py-2">
          {
            toast.isVisible && (
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
          <button aria-label="Menu button"
              className="md:hidden absolute right-4 top-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            { 
              isMenuOpen ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg>
              :
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                }
          </button>
      
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}>
              <ul className='flex flex-col md:flex-row gap-3 list-none text-[rgba(61,8,27,0.75)] font-600 items-center'>
                  <li className="py-2 md:py-0"><Link to="/menu">Menu</Link></li>
                  <li className="py-2 md:py-0"><Link to="/faq">FAQ</Link></li>
                  <li className="py-2 md:py-0"><Link to="/aboutus">About</Link></li>
                  <li className="py-2 md:py-0"><Link to="/contact">Contact</Link></li>
                  { isEmail ? <li className="py-2 md:py-0"><Link to="/profile">My Account</Link></li>
                    :
                    <li className="py-2 md:py-0"><Link to="/location">Location</Link></li>
                  }
              </ul>
          </nav>
      
          <div className='flex flex-wrap items-center justify-center gap-4 text-[rgba(61,8,27,0.75)] mt-4 md:mt-0'>
            <div className='flex items-center'>
                <a aria-label="Phone number" className='hidden md:block   hover:underline text-sm md:text-base' href="tel:+1416-623-0317">(416) 623-0317</a>
            </div>
            <div className="flex items-center gap-4 px-6">
  <button
    onClick={handleSearchClick}
    className="p-2 text-gray-600 hover:text-black focus:outline-none"
    aria-label="Toggle Search"
  >
    {isInputVisible ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0z"
        />
      </svg>
    )}
  </button>

  {isInputVisible && (
    <div className="absolute top-12 left-0 w-full px-4 md:mx-0 md:static md:w-auto">
      <SearchDropdown />
    </div>
  )}

  {/* Profile Icon */}
  <Link to="/login" className="flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-person"
      viewBox="0 0 16 16"
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
    </svg>
  </Link>

  {/* Cart Icon */}
  <Link to="/cart" className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-handbag"
      viewBox="0 0 16 16"
    >
      <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
    </svg>
    <span className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
      {length}
    </span>
  </Link>
</div>

            {
              isEmail && (
                  <div>
                    <button aria-label="Log out" className="bg-green-600 text-white px-3 py-2 rounded text-sm" onClick={LogOutHandler}>
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
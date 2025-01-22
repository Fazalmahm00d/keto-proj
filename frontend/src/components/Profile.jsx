import { Helmet } from "react-helmet";
import Footer from "./Footer"
import Header from "./Header"
import UserProfile from "./UserProfileUpload"
import { getCartItem } from "../lib/cartapi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import DeleteBtnComponent from "./DelBtn";
import { Loader2 } from "lucide-react";

function Profile(){
    const isEmail = useSelector((state) => state.authReducer.isEmail);
  const [cart, setCart] = useState();
  const [totalExpenses, setTotalExpenses] = useState(0);

  const {
    data: cartData,
    isLoading: cartDataLoading,
    isError: cartDataError,
  } = useQuery({
    queryKey: ["get cart data"],
    queryFn: () => getCartItem(isEmail),
    enabled: !!isEmail,
  });

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
      const total = cartData.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      setTotalExpenses(total.toFixed(2));
    }
  }, [cartData]);
  if (cartDataLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }
  if (cartDataError) {
    return (
      <div className="p-4 rounded-md bg-red-50">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-red-400">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading cart
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {error}
            </div>
            <button 
              onClick={fetchCartData}
              className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cartData) {
    return (
      <div className="p-4 text-gray-500">
        No items in cart
      </div>
    );
  }
    return (
        <div className="bg-gray-100 ">
            <Header/>
            <Helmet>
        {/* Page Title */}
        <title>Your Profile | My Awesome Website</title>
        
        {/* Meta Description */}
        <meta name="description" content="Welcome to My Awesome Website!" />
      </Helmet>
            <div className="flex flex-col items-center my-10 ">
            <UserProfile/>
            <div className="bg-white  p-6 sm:p-8  sm:w-[70%] lg:w-[40%] rounded-lg">
        <div className="text-xl font-bold text-gray-800 mb-4">Your Cart</div>
        <div className="h-60 sm:h-80 overflow-y-auto p-2 border border-gray-300 rounded">
          {cartData?.length ? (
            cartData.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center text-sm sm:text-base mt-3 p-2 border-b border-gray-200"
              >
                <div className="flex gap-4">
                  <img
                    src={item.productId.img}
                    alt={item.productId.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {item.productId.name}
                    </h3>
                    <p className="hidden sm:block text-gray-600">
                      Category: {item.productId.category}
                    </p>
                    <p className="hidden sm:block text-gray-600">
                      Price: ${item.productId.price}
                    </p>
                    <p className="text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-700 font-semibold">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                  <DeleteBtnComponent item={item} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
          )}
        </div>
        <div className="flex justify-between font-semibold mt-5">
          <span>Total Expenses:</span>
          <span className="text-lg">${totalExpenses}</span>
        </div>
        <div className="flex gap-4 mt-4">
          <Link to="/menu" className="w-1/2">
            <button className="w-full bg-red-600 hover:bg-red-500 text-white p-3 rounded transition">
              Back to menu
            </button>
          </Link>
          <button className="w-1/2 bg-green-600 hover:bg-green-500 text-white p-3 rounded transition">
            Buy Now
          </button>
        </div>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile
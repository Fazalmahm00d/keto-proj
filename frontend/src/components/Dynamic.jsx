import { Link, useParams } from "react-router-dom"
import Header from "./Header";
import { useEffect, useState } from "react"; // Added useState
import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../ReduxStore/dataCart";
import { updateCart } from "../lib/cartapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../lib/productapi";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

function Dynamic(){
    const { id } = useParams(); // Destructure id directly
    const [filteredData, setFilteredData] = useState(null); // Add state for filtered data
    const dispatch = useDispatch();
    const isEmail = useSelector((state)=>state.authReducer.isEmail)
    const queryClient = useQueryClient();
    const [showToast, setShowToast] = useState(false);
    const [errorToast, setErrorToast] = useState(false);

    const cartMutate=useMutation({
        mutationFn:updateCart,
        onSuccess:(response)=>{
            queryClient.invalidateQueries(["get cart data"]);
            
            // If you have the cart data in the response
            if (response?.data?.user?.cart) {
                dispatch(dataAction.setCartArr(response.data.user.cart));
                // Optionally update the query data immediately
                queryClient.setQueryData(["get cart data"], response.data.user.cart);
                setShowToast(true);

                // Hide the toast after 3 seconds
                setTimeout(() => setShowToast(false), 3000);}
                    },
                    onError:(error)=>{
                        console.log("Cart update error:", error);
                        setErrorToast(true);
                    }
    })
    const {data:productData,isLoading:productDataLoading,isError:productDataError}=useQuery({
        queryKey:["get product data"],
        queryFn:()=>getProductById(id),
    })

    
    useEffect(()=>{
        setFilteredData(productData)
    },[productData])
    
   
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
        
    if (!filteredData) {
        return <div>
          <Header/>
          <div className="min-h-screen flex justify-center items-center">
            <div className="h-16 w-16 aspect-square rounded-full border-8 border-[rgba(61,8,27,0.75)]  border-t-transparent border-b-transparent animate-spin"></div>
          </div>
          <Footer/>
        </div>;
    }
    
    return(
      <div>
        <Helmet>
          <title>{filteredData?.name}</title>
          <meta name="description" content="Welcome to My Awesome Website!" />
        </Helmet>
        <Header />
        <div className="container max-w-7xl lg:mx-auto lg:px-0 px-4 py-6 sm:px-6 md:px-10 ">
          {showToast && (
            <div className="fixed toast toast-top toast-end">
              <div className="alert alert-success shadow-lg flex items-center gap-2">
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
                <span className="font-semibold text-white">Item added successfully!</span>
                <button
                  className="btn btn-xs btn-circle btn-outline text-white hover:bg-green-100"
                  onClick={() => setShowToast(false)} // Replace with your close logic
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          {
            errorToast && (
            <div className="fixed top-0 right-0 m-4 z-50">
              <div className="alert alert-error shadow-lg flex items-center gap-2">
                
                <span className="font-semibold text-white">
                Log In to order
                </span>
                <button
                  className="btn btn-xs btn-circle btn-outline text-white hover:bg-red-700"
                  onClick={() => setErrorToast(false)}
                  aria-label="Close notification"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          <div>
            <Link to="/menu">
              <button className="text-[#512b55] underline">Back to menu</button>
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-10 lg:px-20">
            <div className="w-full lg:w-1/2 px-4 lg:px-8">
              <img
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] object-cover rounded-xl border-gray-300 border-4 overflow-hidden"
                src={filteredData.img}
                alt={filteredData.name}
              />
            </div>
            <div className="text-[#3d081b] w-full lg:w-1/2">
              <h3 className="uppercase text-sm sm:text-base">Ketodalia Restaurant</h3>
              <h1 className="text-xl sm:text-2xl md:text-3xl mt-2">{filteredData.name}</h1>
              <div className="font-bold text-lg sm:text-xl mt-4 sm:mt-6">${filteredData.price}</div>
              <button
                className="w-full sm:w-64 lg:w-96 rounded-full text-sm md:text-base text-white py-2 bg-[#94619a] mt-6 sm:mt-8"
                onClick={() => sendToFb(filteredData._id, filteredData.name, filteredData.price)}
              >
                Add to Order
              </button>
              <div className="text-sm sm:text-base mt-4 sm:mt-6">
                {filteredData.description}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
}

export default Dynamic;
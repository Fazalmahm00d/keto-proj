import { Link, useParams } from "react-router-dom"
import Header from "./Header";
import { useContext, useEffect, useState } from "react"; // Added useState
import { CartContext } from "./contextAPI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../ReduxStore/dataCart";
import { updateCart } from "../lib/cartapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../lib/productapi";

function Dynamic(){
    const { id } = useParams(); // Destructure id directly
    const [filteredData, setFilteredData] = useState(null); // Add state for filtered data
    const dispatch = useDispatch();
    const isEmail = useSelector((state)=>state.authReducer.isEmail)
    const queryClient = useQueryClient();
    const [showToast, setShowToast] = useState(false);

    const cartMutate=useMutation({
        mutationFn:updateCart,
        onSuccess:(response)=>{
            queryClient.invalidateQueries(["get cart data"]);
            
            // If you have the cart data in the response
            if (response?.data?.user?.cart) {
                dispatch(dataAction.setCartArr(response.data.user.cart));
                console.log("calling on successs ")
                // Optionally update the query data immediately
                queryClient.setQueryData(["get cart data"], response.data.user.cart);
                setShowToast(true);

                // Hide the toast after 3 seconds
                setTimeout(() => setShowToast(false), 3000);}
                    },
                    onError:(error)=>{
                        console.error("err:", error)

                    }
    })
    const {data:productData,isLoading:productDataLoading,isError:productDataError}=useQuery({
        queryKey:["get product data"],
        queryFn:()=>getProductById(id),
        onSuccess:(res)=>{
            console.log(res,"response in product")
        }
    })

    // Fetch product data when component mounts
    // useEffect(() => {
    //     const fetchProductData = async () => {
    //         try {
    //             const response = await axios.get(`https://ketodalia.onrender.com/api/products/${id}`);
    //             setFilteredData(response.data.product);
    //         } catch (error) {
    //             console.error("Error fetching product:", error);
    //         }
    //     };

    //     fetchProductData();
    // }, [id]);
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
        
    // Show loading state while data is being fetched
    if (!filteredData) {
        return <div>Loading...</div>;
    }
    
    return(
        <div>
        <Header />
        <div className="px-4 py-6 sm:px-6 md:px-10 lg:px-20 xl:px-32">
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
      </div>
      
    )
}

export default Dynamic;
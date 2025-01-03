import { Link, useParams } from "react-router-dom"
import Header from "./Header";
import { useContext, useEffect, useState } from "react"; // Added useState
import { CartContext } from "./contextAPI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../ReduxStore/dataCart";

function Dynamic(){
    const { id } = useParams(); // Destructure id directly
    const [filteredData, setFilteredData] = useState(null); // Add state for filtered data
    const dispatch = useDispatch();
    const isEmail = useSelector((state)=>state.authReducer.isEmail)
    const isAuthenticate = useSelector((state)=>state.authReducer.isAuthenticate)
    
    const MyContext = useContext(CartContext);

    // Fetch product data when component mounts
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                setFilteredData(response.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProductData();
    }, [id]);
    
    
   
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
        
    // Show loading state while data is being fetched
    if (!filteredData) {
        return <div>Loading...</div>;
    }
    
    return(
        <div>
            <Header/>
            <div className="px-20 py-10">
                <div>
                    <Link to="/menu">
                        <button className="text-[#512b55] underline">Back to menu</button>
                    </Link>
                </div>
                <div className="flex gap-16 mt-10">
                    <div className="w-[50%] px-16 ">
                        <img 
                            className="w-full h-[25rem] rounded-xl border-gray-300 border-4 overflow-hidden" 
                            src={filteredData.img} 
                            alt={filteredData.name} 
                        />
                    </div>
                    <div className="text-[#3d081b] w-[50%]">
                        <h3 className="uppercase text-base">Ketodalia Restaurant</h3>
                        <h1 className="text-3xl mt-2">{filteredData.name}</h1>
                        <div className="font-bold text-xl mt-6">${filteredData.price}</div>
                        <button 
                            className="w-full rounded-full text-l text-white p-2 bg-[#94619a] mt-8"
                            onClick={() => sendToFb(filteredData._id,filteredData.name, filteredData.price)}
                        >
                            Add to Order
                        </button>
                        <div className="text-l mt-6">
                            {filteredData.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dynamic;
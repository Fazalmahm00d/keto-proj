import axios from "axios";

export async function getProductById(id) {
    try{
    const response = await axios.get(`https://ketodalia.onrender.com/api/products/${id}`);
    return response.data.product;
    }catch(error){
        console.error(error)
    }
}   


export async function getAllProducts() {
    console.log("get all products called")
    try{
        const response = await axios.get('https://ketodalia.onrender.com/api/products');
        return response;
    }catch(error){
        console.error(error)
    }
}
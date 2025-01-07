import axios from "axios";

export async function getProductById(id) {
    try{
    const response = await axios.get(`http://localhost:8000/api/products/${id}`);
    return response.data.product;
    }catch(error){
        console.error(error)
    }
}   


export async function getAllProducts() {
    try{
        const response = await axios.get('http://localhost:8000/api/products');
        return response;
    }catch(error){
        console.error(error)
    }
}
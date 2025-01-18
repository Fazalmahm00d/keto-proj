import api from "./api";

export async function getProductById(id) {
    try{
    const response = await api.get(`/api/products/${id}`);
    return response.data.product;
    }catch(error){
        console.error(error)
    }
}   


export async function getAllProducts() {
    console.log("get all products called")
    try{
        const response = await api.get('/api/products');
        return response;
    }catch(error){
        console.error(error)
    }
}


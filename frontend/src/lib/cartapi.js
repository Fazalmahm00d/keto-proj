import axios from "axios"
import api from "./api"

export async function updateCart(obj) {
    try {
        const response = await api.post(`/user/${obj.isEmail}/cart`, obj.newCartItem)
        return response
        // dispatch(dataAction.setCartArr(response.data.user.cart))
    } catch(error) {
        console.error("err: in update  cart", error)
        throw error
    }
}

export async function updateProfile(obj) {
  try {
    const response = await api.put(`/user/${obj.isEmail}/${obj.publicId}`);
    console.log(response,"response in api ")
    // If everything went fine, return the response data
    return response.data; // Assuming the response has data
  } catch (error) {
    console.error("Error in updating profile:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

export async function getUser(isEmail) {
  try {
    const response = await api.get(`/user/${isEmail}`);
    console.log(response,"response in api ")
    // If everything went fine, return the response data
    return response.data; // Assuming the response has data
  } catch (error) {
    console.error("Error in updating profile:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}


export async function getCartItem(isEmail){
    try {
        const response = await api.get(`/user/${isEmail}/cart`, {
          withCredentials: true, // If your API uses cookies for authentication
        });
        // The populated cart data
        const cart = response.data.cart;
        
        return cart; // Return the cart for further use
      } catch (error) {
        console.error("Error fetching cart:", error.response?.data || error.message);
        return null; // Handle error gracefully
      }
}

export async function deleteItem(obj) {
          const productIdString = obj.id.productId._id.toString();
      try{
        await api.delete(`/user/${obj.isEmail}/cart/${productIdString}`)
      }catch(err){
        console.log(err,"error")
      }
}
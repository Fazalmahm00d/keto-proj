import axios from "axios"
import api from "./api"

export async function updateCart(obj) {
    try {
        const response = await api.post(`/user/${obj.isEmail}/cart`, obj.newCartItem)
        console.log(response,"response from update cart")
        return response
        // dispatch(dataAction.setCartArr(response.data.user.cart))
    } catch(error) {
        console.error("err:", error)
    }
}

export async function getCartItem(isEmail){
    try {
        const response = await api.get(`/user/${isEmail}/cart`, {
          withCredentials: true, // If your API uses cookies for authentication
        });
        console.log("response in cart api")
        // The populated cart data
        const cart = response.data.cart;
        console.log("Cart fetched successfully:in cart api", cart);
        
        return cart; // Return the cart for further use
      } catch (error) {
        console.error("Error fetching cart:", error.response?.data || error.message);
        return null; // Handle error gracefully
      }
}

export async function deleteItem(obj) {
          console.log("delete handler")
          console.log(obj,"object in deletes")
          const productIdString = obj.id.productId._id.toString();
          console.log(productIdString,"id of product")
      try{
        await api.delete(`/user/${obj.isEmail}/cart/${productIdString}`)
      }catch(err){
        console.log(err,"error")
      }
}
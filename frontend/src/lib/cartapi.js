import axios from "axios"

export async function updateCart(obj) {
    try {
        const response = await axios.post(`http://localhost:8000/user/${obj.isEmail}/cart`, obj.newCartItem)
        console.log(response,"response from update cart")
        return response
        // dispatch(dataAction.setCartArr(response.data.user.cart))
    } catch(error) {
        console.error("err:", error)
    }
}

export async function getCartItem(isEmail){
    try {
        const response = await axios.get(`http://localhost:8000/user/${isEmail}/cart`, {
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

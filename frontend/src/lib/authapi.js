
import api from "./api";
import Cookies from "js-cookie";


export async function sendToBackend(obj) {
    console.log(obj.data,"data in func send2backend")
    try {
    
      const res=await api.post(obj.URL,obj.data);
      console.log(res,"response from backend")
      return res
      // Update global state with user information
       // Navigate to the home page
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Authentication failed. Please try again.");
    }
  }
  
export async function loginGoogle(obj) {
  console.log(obj,"object in api")
  try{
    const userResponse = await api.post("/api/users/google", {
      email: obj.email,
      username: obj.username,
  });
  if (userResponse.status === 200 || userResponse.status === 201) {
    // Set UI-related cookies
    Cookies.set('isLoggedIn', 'true', {
      secure: true,
      expires: 1/24, // 1 hour
      path: '/'
    });}
  return userResponse
  }catch(error){
    console.error("Error:", error.response ? error.response.data : error.message);
      alert("Authentication failed. Please try again.");
  }
}
import axios from "axios";

export async function sendToBackend(obj) {
    console.log(obj.data,"data in func")
    try {
    
      const res=await axios.post(obj.URL,obj.data);
      return res
      // Update global state with user information
       // Navigate to the home page
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Authentication failed. Please try again.");
    }
  }
  
export async function loginGoogle(obj) {
  try{
    const userResponse = await axios.post("http://localhost:8000/api/users/google", {
      email: obj.email,
      username: obj.displayName,
  });
  return userResponse
  }catch(error){
    console.error("Error:", error.response ? error.response.data : error.message);
      alert("Authentication failed. Please try again.");
  }
}
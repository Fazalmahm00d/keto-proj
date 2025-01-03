import { useContext, useState } from "react";
import { CartContext } from "./contextAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";
import Cookies from "js-cookie";
function Login(props) {
  const MyContext = useContext(CartContext);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // Backend endpoints for login and signup
  const signUpURL = "http://localhost:8000/api/register"; // Replace with your backend's signup endpoint
  const logInURL = "http://localhost:8000/api/login"; // Replace with your backend's login endpoint

  // Function to send data to the backend
  async function sendToBackend(data) {
    const URL = isLogin ? logInURL : signUpURL;
    console.log(data,"data in func")
    try {
      const res = await axios.post(URL, data); // Enable cookies in the request
      console.log(res);
    
      // Update global state with user information
      const user = res.data.user; // Adjust based on your backend response
      const authToken = Cookies.set("authToken",user.idToken,{
          secure: true,
          expires: new Date(new Date().getTime() + 60 * 60 * 1000)
        });

      if (authToken) {
        console.log("Token retrieved:", authToken);
      } else {
        console.log("No token found");
      }
      dispatch(authAction.changeEmailValue(user.email));
      dispatch(authAction.changeTokenValue(user.idToken))
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Authentication failed. Please try again.");
    }
  }

  // Toggle login/signup mode
  function TurnToLoginMode() {
    setIsLogin(true);
  }

  function TurnToSignUpMode() {
    setIsLogin(false);
  }

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    let data
    if(isLogin){ 
      data = {
      email,
      password,
    };}else{
        const username=e.target.username.value;
         data = {
            email,
            password,
            username
          }
    }

    sendToBackend(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <div className="flex gap-3 rounded-2xl w-full">
          <button
            className={`rounded-2xl w-[50%] px-4 py-2 ${isLogin ? "bg-blue-700 text-white" : "bg-gray-200"}`}
            onClick={TurnToLoginMode}
          >
            Login
          </button>
          <button
            className={`rounded-2xl w-[50%] px-4 py-2 ${!isLogin ? "bg-blue-700 text-white" : "bg-gray-200"}`}
            onClick={TurnToSignUpMode}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <input
              className="text-xl border rounded-md p-2" 
              type="text" 
              name="username" 
              placeholder="Username" 
            />
          )}
          <input 
            className="text-xl border rounded-md p-2" 
            type="email" 
            name="email" 
            placeholder="Email Address" 
          />
          <input 
            className="text-xl border rounded-md p-2" 
            type="password" 
            name="password" 
            placeholder="Password" 
          />
          <a className="text-sm text-blue-700 font-bold">Forgot Password?</a>
          <button 
            type="submit" 
            className="rounded-xl bg-blue-700 text-white p-2 hover:bg-blue-800 transition-colors duration-200" 
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <div className="text-center text-sm">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login
                </button>
              </p>
            )}
          </div>
      </div>
    </div>
  );
}

export default Login;

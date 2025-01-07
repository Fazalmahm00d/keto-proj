import { useContext, useState } from "react";
import { CartContext } from "./contextAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";
import Cookies from "js-cookie";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import { useMutation } from "@tanstack/react-query";
import { loginGoogle, sendToBackend } from "../lib/authapi";
import { Toast } from "./Toast";

function Login(props) {
  const MyContext = useContext(CartContext);
  
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  console.log("in the login page")
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", type: "", isVisible: false });

  // Backend endpoints for login and signup
  const signUpURL = "http://localhost:8000/api/register"; // Replace with your backend's signup endpoint
  const logInURL = "http://localhost:8000/api/login"; // Replace with your backend's login endpoint


  const handleToast = (message, type) => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast({ ...toast, isVisible: false }), 30000); // Hide toast after 3 seconds
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Update message based on password length
    if (value.length >= 8) {
      setPasswordMessage("Password meets the necessary requirements.");
    } else {
      setPasswordMessage("Password must be at least 8 characters long.");
    }
  };
  // Function to send data to the backend'
  const mutation=useMutation({
  mutationFn:sendToBackend,
  onSuccess:(res)=>{
    console.log(res)
    const user = res?.data?.user; // Adjust based on your backend response
      const authToken = Cookies.set("authToken",user.idToken,{
          secure: true,
          expires: 1/24,
          path:'/'
        });
      const email=Cookies.set("email",user.email,{
        secure:true,
        expires:1/24,
        path:'/'
      }

      )

      if (authToken) {
        console.log("Token retrieved:", authToken);
      } else {
        console.log("No token found");
      }
      dispatch(authAction.changeEmailValue(user.email));
      dispatch(authAction.changeTokenValue(user.idToken))
      navigate("/");
  },
  onError:(error)=>{
    console.error("Mutation failed:", error.response?.data || error.message);
  }
 })


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
  
      // Extract user details
      const user =  result.user;
      // Extract tokens
      const accessToken = user.accessToken; // Token for frontend usage
      const idToken = result._tokenResponse.idToken; // Token for backend verification
      dispatch(authAction.changeTokenValue(idToken))
      const newEmail = user.email
      dispatch(authAction.changeEmailValue(newEmail))
      Cookies.set('authToken',idToken,{
        secure:true,
        expires:1/24,
        path:'/'
      })
      Cookies.set('email',newEmail,{
        secure:true,
        expires:1/24,
        path:'/'
      });

      console.log("User Info:", user);
      console.log("Access Token:", accessToken);
      console.log("ID Token:", idToken);
      console.log(user.email,user.displayName)
      const obj= {
        email: user.email,
        username: user.displayName,
      }  
      if(!mutation.isPending && !googleMutate.isPending){
        googleMutate.mutate(obj)
      }
    
      } catch (error) {
        console.error("Login error:", error.message);
        handleToast("Failed to login", "alert-error");
      }
    };
  // Toggle login/signup mode
  const googleMutate=useMutation({
    mutationFn:loginGoogle,
    onSuccess:(userResponse)=>{
      console.log(userResponse,"response from user")
          if (userResponse.status === 201 || 200) {
            // navigate('/')
          
          handleToast(`Welcome, ${userResponse.data.user.username}!`, "success");
          setTimeout(()=>navigate("/"),2000)
          }
    },
    onError:(error)=>{
      console.error("Mutation failed:", error.response?.data || error.message);
      handleToast("Failed to login", "alert-error");

    }
  })

  // Form submission handler
  const handleSubmit = (e) => {
    const URL = isLogin ? logInURL : signUpURL;

    e.preventDefault();
    console.log("signup called")
    const email = e.target.email.value;
    const password = e.target.password.value;
    let obj
    if(isLogin){ 
      obj={
        URL,
      data : {
      email,
      password,
    }};}else{
        const username=e.target.username.value;
        obj={
        URL,
        data : {
            email,
            password,
            username
          }}
    }
    console.log(obj,"obj before sending")
    mutation.mutate(obj);
  };

  return (
    <div className="min-h-screen bg-[url('./src/assets/bg2.png')] bg-cover flex items-center justify-center gap-20">
  {/* Left Section */}
  {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      )}

  <div className="p-6 text-center text-white">
    <h2 className="text-4xl font-bold mb-4 font-serif">Why Choose Us?</h2>
    <ul className="space-y-6 font-medium text-white text-xl text-left font-mono">
      {[
        "Exceptional food with fresh, quality ingredients.",
        "A diverse menu catering to all dietary preferences.",
        "Quick, friendly, and reliable service every time.",
        "Customer-focused with meal customization options.",
        "A warm, welcoming ambiance for every occasion."
      ].map((text, idx) => (
        <li key={idx} className="flex items-center gap-4">
          <span className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0zm1 0a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0z" />
              <path d="M10.854 6.354a.5.5 0 0 0-.708-.708L7 9.293 5.854 8.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4z" />
            </svg>
          </span>
          {text}
        </li>
      ))}
    </ul>
  </div>

  {/* Right Section */}
  <div className="bg-white rounded-lg shadow-xl w-[400px] p-8">
    <h1 className="text-2xl font-bold text-center mb-2">
      {isLogin ? "Welcome Back" : "Create Your Account"}
    </h1>
    <p className="text-sm text-gray-500 text-center mb-6">
      Welcome! Please fill in the details to get started.
    </p>

    {/* Social Login Buttons */}
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary flex items-center gap-2 w-[48%]"
      >
        <img
          src="https://cdn.jsdelivr.net/npm/simple-icons/icons/facebook.svg"
          alt="Facebook"
          className="w-5 h-5"
        />
        Facebook
      </button>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-error flex items-center gap-2 w-[48%]"
      >
        <img
          src="https://cdn.jsdelivr.net/npm/simple-icons/icons/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Google
      </button>
    </div>

    {/* Divider */}
    <div className="divider">OR</div>

    {/* Form */}
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <div className="form-control mb-4">
          <input
            type="text"
            name="username"
            placeholder="User name"
            className="input input-bordered w-full"
          />
        </div>
      )}
      <div className="form-control mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control mb-4">
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <p
          className={`text-sm mt-1 ${
            password.length >= 8 ? "text-green-600" : "text-red-600"
          }`}
        >
          {passwordMessage}
        </p>
      </div>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="btn btn-primary w-full"
      >
        {mutation.isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Continue"
        )}
      </button>
    </form>

    {/* Switch Between Login and Signup */}
    <div className="text-center text-sm mt-4">
      {isLogin ? (
        <p>
          Don't have an account?{" "}
          <button
            onClick={() => setIsLogin(false)}
            className="link link-primary"
          >
            Sign up
          </button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <button
            onClick={() => setIsLogin(true)}
            className="link link-primary"
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


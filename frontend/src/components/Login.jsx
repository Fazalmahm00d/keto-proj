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
        className="btn btn-outline btn-primary-content flex items-center gap-1 w-[48%]"
      >
        <svg
  height="50%"
  style={{
    fillRule: "evenodd",
    clipRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: 2,
  }}
  version="1.1"
  viewBox="0 0 512 512"
  width="30%"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <g>
    <path
      d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"
      style={{ fill: "#1877f2", fillRule: "nonzero" }}
    />
    <path
      d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 30,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z"
      style={{ fill: "#fff", fillRule: "nonzero" }}
    />
  </g>
</svg>

        Facebook
      </button>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary-content flex items-center gap-2 w-[48%]"
      >
          <svg
          height="50%"
    enableBackground="new 0 0 20 20"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <path
        d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
        fill="#F44336"
      />
      <path
        d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
        fill="#2196F3"
      />
      <path
        d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
        fill="#FFC107"
      />
      <path
        d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
        fill="#00B060"
      />
      <path
        d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
        opacity="0.1"
      />
      <polygon
        points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
        opacity="0.1"
      />
      <path
        d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
        fill="#E6E6E6"
      />
      <path
        d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
        fill="#FFFFFF"
        opacity="0.2"
      />
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="0"
        x2="24"
        y1="12"
        y2="12"
      >
        <stop offset="0" style={{ stopColor: "#FFFFFF", stopOpacity: 0.2 }} />
        <stop offset="1" style={{ stopColor: "#FFFFFF", stopOpacity: 0 }} />
      </linearGradient>
      <path
        d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
        fill="url(#SVGID_1_)"
      />
    </g>
  </svg>


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


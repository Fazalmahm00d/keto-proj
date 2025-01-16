import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";
import Cookies from "js-cookie";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import { useMutation } from "@tanstack/react-query";
import { loginGoogle, sendToBackend } from "../lib/authapi";
import { Toast } from "./Toast";

function Login(props) {
  
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  console.log("in the login page")
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", type: "", isVisible: false });

  // Backend endpoints for login and signup
  const signUpURL = "https://ketodalia.onrender.com/api/register"; // Replace with your backend's signup endpoint
  const logInURL = "https://ketodalia.onrender.com/api/login"; // Replace with your backend's login endpoint


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
        // expires:1/24,
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
      console.log(result,"result from google login  ")
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
    <div className="min-h-screen bg-[#7E5CAD] md:bg-[url('./src/assets/bg2.png')] bg-cover bg-no-repeat flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 px-6">
        {toast.isVisible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, isVisible: false })}
          />
        )}
        <div className="hidden md:block p-10 md:p-6 text-center text-white md:w-1/2">
          <div className=" p-6 rounded-md my-6 w-fit backdrop-blur-3xl backdrop-brightness-125	 bg-white/60">
          <img 
                  src="//www.ketodelia.ca/cdn/shop/files/Ketodelia_Logo_1b.png?v=1664321580" 
                  alt="Ketodelia Restaurant" 
                  width="150" 
                  height="56" 
                  className="md:w-[190px] md:h-[70.68px]" 
                />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-center md:text-left">Why Choose Us?</h2>
          <ul className="space-y-4 md:space-y-6 font-medium text-white text-lg md:text-xl text-left font-mono">
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
                    width="20"
                    height="20"
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

        <div className="bg-white rounded-lg shadow-xl px-10 md:w-[400px] my-10 py-3 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-center mb-4">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Welcome! Please fill in the details to get started.
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <button aria-label="Google login"
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-primary-content flex items-center gap-2 w-full sm:w-[48%]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30%" height="50%" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
              Google
            </button>
            <button aria-label="Facebook login"
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-primary-content flex items-center gap-2 w-full sm:w-[48%]"
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
          </div>

          <div className="divider">OR</div>

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
            <button aria-label="Submit button"
              type="submit"
              disabled={mutation.isLoading}
              className="btn btn-primary w-full"
            >
              {mutation.isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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

          <div className="text-center text-sm mt-4">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button aria-label="change to signup"
                  onClick={() => setIsLogin(false)}
                  className="link link-primary"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button aria-label="change to login"
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


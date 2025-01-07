const bcrypt = require("bcrypt");
 // Assuming User schema is imported
const cookieParser = require("cookie-parser");
const crypto = require("crypto"); // For token generation
const express = require("express");
const User = require("../models/usermodel");
const Authenticate = require("../models/authmodel");

const app = express();
app.use(cookieParser());

// Token expiration time (e.g., 1 hour)
const TOKEN_EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

// Generate a token
const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Middleware to authenticate user using JSON cookies
const authenticateUser = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Ideally, validate token against a database or in-memory store
  next();
};

exports.register = async (req, res) => {
    try {
      const { email, username, password } = req.body;
      console.log("register calling")
        
      // Check if email or username already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res.status(400).json({
          message: "Email or username already exists",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Debug log before auth save
      console.log("Attempting to save auth user with:", {
        email,
        passwordLength: hashedPassword.length
      });

      // Create authentication record with explicit error handling
      const authUser = new Authenticate({
        email,
        password: hashedPassword,
      });

      console.log("Created auth model instance:", authUser);

      try {
        const savedAuthUser = await authUser.save();
        console.log("Successfully saved auth user:", savedAuthUser);
      } catch (authError) {
        console.error("Failed to save auth user:", {
          error: authError.message,
          stack: authError.stack,
          code: authError.code
        });
        throw authError;
      }
  
      // Create and save user record
      const newUser = new User({
        email,
        username,
        cart: [],
        wishlist: []
      });
      const savedUser = await newUser.save();
      console.log("Saved User:", savedUser);
  
      // Generate a token
      const token = await generateToken();
      console.log("token" ,token)
      // res.cookie("authToken", token, {
      //   // httpOnly: true,
      //   secure: true,
      //   maxAge: TOKEN_EXPIRATION_TIME,
      // });
  
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: savedUser._id,
          email: savedUser.email,
          username: savedUser.username,
          idToken:token
        },
      });
    } catch (error) {
      console.error("Registration error:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code
      });
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
};
// Login Controller
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;
    
    // Check if user exists
    const auth = await Authenticate.findOne({ email });
    console.log(auth,"user found")
    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, auth.password);
    if (!isPasswordValid) {
        console.log("password invalidated")
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("password validated")
    // Generate a token
    const user=await User.findOne({email})

    const token =await generateToken();
    console.log("token genrated ",token)
  

    // Send response
    res.status(200).json({ message: "Login successful",user: {
      id: user._id,
      email: user.email,
      username: user.username,
      idToken:token
    }
    });
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.googlelogin= async(req,res)=>{
  try{
    const { email , username} =req.body;
  const existingUser = await User.findOne({ email });

  if(existingUser){
    res.status(200).json({ message: "Login successful",user: {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    }
    })
  }
  else{
    const newUser = new User({
      email,
      username,
      cart: [],
      wishlist: []
    });
    const savedUser = await newUser.save();
    console.log("Saved User:", savedUser);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        idToken:token
      },
    });
  }
  }catch(error){
    res.status(500).json({ message: "Server error", error });

  }


}
// // Logout Controlle
// // Example Protected Route
// exports.getProfile = [authenticateUser, async (req, res) => {
//   try {
//     // Fetch user information using the cookie
//     const token = req.cookies.authToken;

//     // Find the user associated with the token (assuming tokens are stored in DB)
//     const user = await User.findOne({ token }); // Update logic if you store tokens differently

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }

//     res.status(200).json({ message: "User profile", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// }];

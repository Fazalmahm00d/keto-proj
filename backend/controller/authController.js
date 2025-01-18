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
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create authentication record
    const authUser = new Authenticate({ email, password: hashedPassword });
    const savedAuthUser = await authUser.save();

    // Create user record
    const newUser = new User({ email, username, cart: [], wishlist: [] });
    const savedUser = await newUser.save();

    // Generate a token
    const token = await generateToken({ id: savedUser._id, email: savedUser.email });

    // Set cookie with token
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: TOKEN_EXPIRATION_TIME,
    });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        idToken: token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists in Authenticate
    const auth = await Authenticate.findOne({ email });
    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Authentication record found");

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, auth.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("Password validated successfully");

    // Fetch user record
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User record not found" });
    }
    console.log("User record found:", user.username);

    // Generate a token
    const token = await generateToken({ id: user._id, email: user.email });
    console.log("Token generated:", token);

    // Set auth token in cookies
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: TOKEN_EXPIRATION_TIME,
    });

    // Send success response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        idToken: token,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.googlelogin= async(req,res)=>{
  console.log("request body",req.body)
  try{
    const { email , username} =req.body;
  const existingUser = await User.findOne({ email });
    console.log("existing user",existingUser)
  if(existingUser){
    const token = generateToken();
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: TOKEN_EXPIRATION_TIME,
      });
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
    console.log("newuser",newUser)
    const savedUser = await newUser.save();
    const token = generateToken();
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: TOKEN_EXPIRATION_TIME,
    });
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

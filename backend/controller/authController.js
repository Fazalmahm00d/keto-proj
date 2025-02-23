const jwt = require('jsonwebtoken');  // You'll need to install jsonwebtoken
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const express = require("express");
const User = require("../models/usermodel")

const app = express();
app.use(cookieParser());

const TOKEN_EXPIRATION_TIME = 3600000; // 1 hour in milliseconds
const JWT_SECRET = process.env.JWT_SECRET  // Use environment variable in production

// Generate a JWT token with user information
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Middleware to authenticate user using JWT
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user and attach to request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword, // Store password in User model
      cart: [],
      wishlist: []
    });

    const savedUser = await newUser.save();
    
    // Generate JWT token
    const token = generateToken(savedUser);

    // Set cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: TOKEN_EXPIRATION_TIME,
    });

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: TOKEN_EXPIRATION_TIME,
    });

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
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.googlelogin = async (req, res) => {
  console.log("Google login request received:", req.body);
  try {
    const { email, username } = req.body;
    
    if (!email || !username) {
      return res.status(400).json({ message: "Email and username are required" });
    }

    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      // Create new user for first-time Google login
      user = new User({
        email,
        username,
        cart: [],
        wishlist: [],
        isGoogleUser: true // Optional: flag to identify Google users
      });
      await user.save();
      isNewUser = true;
      console.log("New Google user created:", user);
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set cookie with appropriate settings for Google OAuth
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true, // Always use secure for OAuth
      sameSite: "none", // Required for cross-site OAuth
      maxAge: TOKEN_EXPIRATION_TIME,
    });

    res.status(isNewUser ? 201 : 200).json({
      message: isNewUser ? "User registered successfully" : "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        idToken: token
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Protected route example
exports.getProfile = [authenticateUser, async (req, res) => {
  try {
    // req.user is already populated by authenticateUser middleware
    res.status(200).json({ message: "User profile", user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}];
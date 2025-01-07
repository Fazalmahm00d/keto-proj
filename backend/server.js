const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();
const connectDB = require("./config/dbConfig");
const { register, login, googlelogin } = require("./controller/authController");
const { addToCart, getCart, deleteCartItem } = require("./controller/userController");
const { createProduct, getAllProducts, getProductById } = require("./controller/productController");

app.use(
    cors({
      origin: "http://localhost:5173", // Replace with the frontend's URL
      credentials: true, // Allow cookies and other credentials
    })
  );
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/users/google", googlelogin)

app.post("/user/:email/cart",addToCart)
app.get("/user/:email/cart",getCart)

app.delete("/user/:email/cart/:id",deleteCartItem)

app.post('/api/products', createProduct);

// GET /api/products - Get all products
app.get('/api/products', getAllProducts);

// GET /api/products/:id - Get single product by ID
app.get('/api/products/:id', getProductById);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
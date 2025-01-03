const mongoose = require("mongoose");

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type:String,
  },
  category:{
    type:String,
  }
});

// Create Product Model
const Product = mongoose.model("product", productSchema);

module.exports = Product;

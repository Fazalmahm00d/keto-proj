const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Reference to the Product model
        required: true,
      },
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;

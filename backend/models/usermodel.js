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
  profile: {
    type: String,
    default: function () {
      return `profile_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }, 
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
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
        ref: "product",
        required: true,
      },
    },
  ],
});

const User = mongoose.model("ketouser", userSchema);

module.exports = User;


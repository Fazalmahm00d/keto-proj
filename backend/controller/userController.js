const Product = require("../models/productmodel");
const User = require("../models/usermodel");

exports.addToCart = async (req, res) => {
    const { email } = req.params;
    const { productId } = req.body;
  
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      // Check if the product is already in the cart
      const existingCartItem = user.cart.find((item) =>
        item.productId.equals(productId)
      );
  
      if (existingCartItem) {
        // If the product is already in the cart, increment the quantity
        existingCartItem.quantity += 1;
      } else {
        // Otherwise, add the product to the cart
        user.cart.push({ productId, quantity: 1 });
      }
  
      await user.save();
  
      res.status(200).json({ message: "Product added to cart" ,user});
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  exports.getCart = async (req, res) => {
    const { email } = req.params;
  
    try {
      // Find the user and populate the cart's product details
      const user = await User.findOne({ email }).populate("cart.productId");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ cart: user.cart });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  exports.deleteCartItem=async(req,res)=>{
    const { email , id} =req.params;
    console.log(id,"item id")
    try{
      const user =await User.findOne({email})
      if(!user){
        return res.status(404).json({error: "User not found"})
      }
      const delitemIndex=user.cart.findIndex((items)=>items.productId._id === id)
      user.cart.splice(delitemIndex,1)
      await user.save();
      res.status(200).json({message:"Item deleted successfully"})
    }catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Server error" });
    }
  }

  exports.getUserProfile=async(req,res)=>{
    const { email } =req.params;
    try{
      const user =await User.findOne({email})
      if(!user){
        return res.status(404).json({error: "User not found"})
      }
      res.status(200).json({message:"User found",user})
    }catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
  exports.addPublicId = async (req, res) => {
    console.log("func called")

    const { email, publicId } = req.params;
    console.log(email,publicId)
    // Validate input
    if (!email || !publicId) {
      return res.status(400).json({ error: "Email and Public ID are required" });
    }
  
    try {
      // Find the user and update the profile field
      const user = await User.findOneAndUpdate(
        { email }, // Filter by email
        { profile: publicId }, // Update the profile field
        { new: true, runValidators: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        message: "Profile ID updated successfully",
        user, // Return the updated user object
      });
    } catch (error) {
      console.error("Error updating profile ID:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
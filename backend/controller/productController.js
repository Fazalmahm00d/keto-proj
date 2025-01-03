// controllers/productController.js
  // Adjust path as needed

const Product = require("../models/productmodel");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, img ,category } = req.body;

        // Create new product instance
        const product = new Product({
            name,
            price,
            description,
            img,
            category
        });

        // Save the product
        const savedProduct = await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: savedProduct
        });

    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve products",
            error: error.message
        });
    }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Get product error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve product",
            error: error.message
        });
    }
};
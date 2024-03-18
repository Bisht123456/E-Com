const mongoose = require("mongoose");

// Define Schema
const productSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  images: {
    type: String,
  },
});

// Create Model
const ProductImage = mongoose.model("ProductImage", productSchema);
module.exports = ProductImage;


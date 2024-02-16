const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
  description: String,
  product_category_id: {
    type: String,
    default: ""
  },
  price: Number,
  discountPercentage: Number,
  stock: Number,  
  thumbnail: String,
  status: String,
  featured: String,
  position: Number,
  deleted: {
    type: Boolean,
    default: false
  },
  
  createdBy: {
    account_id: String,
    default: {
      type: Date,
      default: Date.now
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  deletedBy: {
    account_id: String,
    deletedAt: Date
  }
},{
  timestamps:true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
const mongoose = require("mongoose");

const oderSchema = new mongoose.Schema(
  {
    // user_id: String,
    cart_id: String,
    userInfo: {
        fullName: String,
        phoneNumber: String,
        address: String,
    },
    products: [
        {
            product_id: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number,
        },
    ],
  },

  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", oderSchema, "order");

module.exports = Order;
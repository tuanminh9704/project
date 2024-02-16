const Cart = require("../../models/cart");
const Product = require("../../models/products");
const Order = require("../../models/order");

// [GET] /checkout/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  });

  cart.totalPrice = 0;

  if(cart.products.length > 0) {
    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id
      }).select("thumbnail title slug price discountPercentage");

      product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);

      item.productInfo = product;

      item.totalPrice = item.quantity * product.priceNew;

      cart.totalPrice += item.totalPrice;
    }
  }

  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  });
};

//[POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  // console.log(cartId);
  // console.log(req.body);

  const orderInfo = {
    cart_id: cartId,
    userInfo: req.body,
    products: []
  }

  const cart = await Cart.findOne({
    _id: cartId
  })

  // console.log(cart);

  for (const item of cart.products) {
    const product = await Product.findOne({
      _id: item.product_id
    })

    const objectProduct = {
      product_id: item.product_id,
      price: product.price,
      discountPercentage: product.discountPercentage,
      quantity: item.quantity
    }

    // console.log(objectProduct);

    orderInfo.products.push(objectProduct);
  }

  console.log(orderInfo);

  const order = new Order(orderInfo);

  await order.save();


  await Cart.updateOne({
    _id: cartId
  }, {
    products: []
  });

  // console.log(cart);
  res.redirect(`/checkout/success/${order.id}`);
}

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.orderId
  });

  order.totalPrice = 0;

  for (const product of order.products) {
    const infoProduct = await Product.findOne({
      _id: product.product_id
    });

    product.title = infoProduct.title;
    product.thumbnail = infoProduct.thumbnail;

    product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);

    product.totalPrice = product.priceNew * product.quantity;

    order.totalPrice += product.totalPrice;
  }

  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    order: order
  });
};
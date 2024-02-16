const Cart = require("../../models/cart");
const Product = require("../../models/products");

//[GET] /cart
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    
    const cart = await Cart.findOne({
        _id: cartId
    })

    // console.log(cart);

    let priceTotal = 0;

    let total = 0;

    if(cart.products.length > 0){
        for (const item of cart.products) {
            const product = await Product.findOne({
                _id: item.product_id,
            })

            product.priceNew = (product.price * (1 - product.discountPercentage/100)).toFixed(0);

            item.productInfo = product;

            priceTotal = item.quantity * product.priceNew;

            item.priceTotal = priceTotal;
            total += item.priceTotal;
        }
    }

    cart.total = total;

    res.render("client/pages/cart/index", {
        cartDetail: cart
    });
}

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({
        _id: cartId
    }); 

    const existsProduct = cart.products.find(item => item.product_id == productId);

    // console.log(existsProduct);

    if(existsProduct){
        const newQuantity = quantity + existsProduct.quantity;

        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId,
        }, {
            'products.$.quantity': newQuantity,
        });
    }
    else{
        const objectProduct = {
            product_id: productId,
            quantity: quantity,
        };

        await Cart.updateOne({
            _id: cartId,
        }, {
            $push: {products : objectProduct},
        })
    }

    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công!");
    
    res.redirect("back");
}

// [GET] /delete/:productId
module.exports.delete = async (req, res) => {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;

    // console.log(productId);
    // console.log(cartId);

    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: {products: {product_id: productId}},  // $pull để xóa 1  giá trị trong mảng 
    })

    req.flash("success", "Xóa  sản phẩm khỏi giỏ hàng thành công!");

    res.redirect("back");
}

// [GET] /update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const quantity = req.params.quantity;
    const productId = req.params.productId;

    // console.log(cartId);
    // console.log(quantity);
    // console.log(productId);

    await Cart.updateOne({_id: cartId, "products.product_id": productId}, {
        '$set':  {'products.$.quantity': quantity}, // update 1 giá  trị trong object trong mảng của 1 bản ghi trong database
    })

    res.redirect("back");
}
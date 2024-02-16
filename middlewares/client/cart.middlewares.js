const Cart = require("../../models/cart");

module.exports.cart = async (req, res, next) => {
    if(!req.cookies.cartId) {
        const cart = new Cart();

        await cart.save();

        const expires = 1000 * 60 * 60 * 24 * 365;

        res.cookie("cartId", cart.id,  { expires: new Date(Date.now() + expires), httpOnly: true });
    }
    else{
        const cart = await Cart.findOne({
            _id: req.cookies.cartId,
        })

        res.locals.cart = cart;
    }

    next();
}
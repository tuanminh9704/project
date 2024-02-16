const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const searchRouter = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");

const productCategoryMiddleware = require("../../middlewares/client/category.middlewares");
const cartMiddleware = require("../../middlewares/client/cart.middlewares");
const loginMiddleware = require("../../middlewares/client/user.middleware");
const settingsMiddleware = require("../../middlewares/client/setting.middleware");

module.exports = (app) => {
    app.use(productCategoryMiddleware.category);

    app.use(cartMiddleware.cart);

    app.use(loginMiddleware.loginPost);

    app.use(settingsMiddleware.settingsGeneral);

    app.use("/", homeRouter);
    
    app.use("/products", productRouter);

    app.use("/search", searchRouter);

    app.use("/cart", cartRoutes);

    app.use("/checkout", checkoutRoutes);

    app.use("/user", userRoutes);

}
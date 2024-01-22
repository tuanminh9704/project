const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const trashRoutes = require("./trash.route");
const productCategoryRoutes = require("./productCategory.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

const systemConfig = require("../../configs/system");


module.exports = (app) => {

    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, authMiddleware.auth, dashboardRoutes);
    
    app.use(`${PATH_ADMIN}/products`, authMiddleware.auth, productRoutes);

    app.use(`${PATH_ADMIN}/trash`, authMiddleware.auth, trashRoutes);

    app.use(`${PATH_ADMIN}/productsCategory`, authMiddleware.auth, productCategoryRoutes);

    app.use(`${PATH_ADMIN}/roles`, authMiddleware.auth, roleRoutes);

    app.use(`${PATH_ADMIN}/accounts`, authMiddleware.auth, accountRoutes);

    app.use(`${PATH_ADMIN}/auth`, authRoutes);
}
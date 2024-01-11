const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const trashRoutes = require("./trash.route");
const systemConfig = require("../../configs/system");


module.exports = (app) => {

    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
    
    app.use(`${PATH_ADMIN}/products`, productRoutes);

    app.use(`${PATH_ADMIN}/trash`, trashRoutes);
}
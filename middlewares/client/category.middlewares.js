const ProductCategory = require("../../models/productsCategory");
const createtree = require("../../helpers/tree");

module.exports.category = async (req, res, next) => {
    const productCategory = await ProductCategory.find({
        deleted: false,

    })
    const layoutsProductCategory = createtree.tree(productCategory);

    res.locals.newlayoutsProductCategory = layoutsProductCategory;
    
    next();

}
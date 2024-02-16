const ProductCategory = require("../models/productsCategory");

const getSubcategory = async (parentId) => {
    const subs = await ProductCategory.find({
      parent_id: parentId,
      deleted: false,
      status: "active"
    })
    let allSubs = [...subs]; // dùng để tạo ra mangr mới giôngs mảng kia

    for (const sub of subs) {
      const childs = await getSubcategory(sub.id);
      allSubs = allSubs.concat(childs); // nối mảng
    }
    return allSubs;
  }

module.exports = getSubcategory;
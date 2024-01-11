const Product = require("../../models/products");
const filterStatusHelper = require("../../helpers/filterStatus");
const objectSearchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../configs/system");

//[GET] /admin/products/
module.exports.index = async (req, res) => {

    // Bộ lọc theo trạng thái
    const filterStatus = filterStatusHelper(req.query); 

    const find = {
        deleted: false,
    }
    if(req.query.status) {
        find.status = req.query.status;
    }

    // Search
    const objectSearch = objectSearchHelper(req.query);
    if(req.query.keyword){
        find.title = objectSearch.regex;
    }

    const objectPaginationInit = {
        currentPage: 1, // trang hiện tại
        limitPage : 4 // giới hạn số phần tử của 1 trang 
    }

    // pagination
    const countProduct = await Product.countDocuments(find); // tổng số sản phẩm trong csdl
    const objectPagination = paginationHelper(objectPaginationInit, req.query, countProduct);
    
    const products = await Product.find(find)
    .sort({ position: 'desc' })
    .limit(objectPagination.limitPage)
    .skip(objectPagination.skip);

    res.render("admin/pages/product/index", {
        pageTitle: "Trang quản lý sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        objectPagination: objectPagination     
    });
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});

    req.flash("success", "Cập nhật trạng thái thành công!");

    res.redirect("back");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    // console.log(type);
    const ids = req.body.ids.split(", ");

    // console.log(ids);
  
    switch (type) {
      case "active":
      case "inactive":
        await Product.updateMany({
          _id: { $in: ids }
        }, {
          status: type
        });

        req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công!`);

        break;
      case "delete-all":
        await Product.updateMany({
          _id: {$in : ids}
        },{
          deleted: true, deletedAt: new Date()
        })

        req.flash("success", `Xóa ${ids.length} sản phẩm thành công!`);

        break;

      case "change-position":
        for (const item of ids) {
          const [id, position] = item.split("-");
          // console.log(id);

          const newPosition = parseInt(position);
          // console.log(newPosition);
          await Product.updateOne({_id: id}, {position: newPosition});
        }

        req.flash("success", `Cập nhật vị trí ${ids.length} sản phẩm thành công!`);
        
        break;

      default:
        break;
    }
  
    res.redirect("back");
}

//[DELETE] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  await Product.updateOne({_id: id}, {deleted: true, deletedAt: new Date()});

  req.flash("success", "Xóa sản phẩm thành công!");

  res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/product/create", {
    pageTitle: "Tạo mới sản phẩm"
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if(req.body.position == ""){
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  }
  else{
    req.body.position = parseInt(req.body.position);
  }

  console.log(req.file);

  if(req.file && req.file.filename) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body);

  product.save();

  req.flash("success", "Tạo mới sản phẩm thành công!");

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

//[GET] /admin/products/edit/:id

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id,
  }

  const product = await Product.findOne(find);
  // console.log(product);

  res.render("admin/pages/product/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product
  })
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
  
  
    if(req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
  
    await Product.updateOne({_id: id}, req.body);
    
    req.flash("success", "Cập nhật sản phẩm thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại!");
    res.redirect("back");
  }

}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id : id
  }

  const product = await Product.findOne(find);

  res.render("admin/pages/product/detail", {
    pageTitle: product.title,
    product: product
  })
}
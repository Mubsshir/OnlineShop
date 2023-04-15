const Product = require("../models/product");
const Cart = require("../models/cart");
exports.postAddProduct = async (req, res, next) => {
  const { title, img, price, desc } = req.body;
  const product = new Product(title, img, price, desc,req.session.user  );
  const result = await product.saveProduct();
  res.render("admin/add-product", {
    docTitle: "Add Product",
    status: result.success,
    showMessage: true
  });
};

exports.getAdminProducts = async (req, res, next) => {
  const result = await Product.fetchAdminProducts(req.session.user);
  const deleteMsg=req.flash('success')[0];
  res.render("admin/products", {
    docTitle: "Admin Products",
    path: "/admin/products",
    prods: result.products,
    err: result.error,
    msg:result.msg,
    deleteMsg
  });
};

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "add product",
    path: "/admin/add-product",
    showMessage: false
  });
};

exports.getEditProduct = async (req, res) => {
  const prodId = req.params.id;
  const product = await Product.FindByID(prodId);
  const updateMsg=req.flash('success')[0];
  res.render("admin/edit-product", {
    docTitle: "Edit Product",
    prod: product[0],
    updateMsg
  });
};
exports.postEditProduct = async (req, res) => {
  await Product.editProduct(req.body);
  req.flash('success','Product Updated')
  res.redirect("/admin/products");
};
exports.postDeleteProduct = async (req, res) => {
  const prodID = req.body.id;
  const uid=req.session.user;
  await Product.deleteItem(prodID,uid);
  req.flash('success','Product Deleted')
  res.redirect("/admin/products");
};

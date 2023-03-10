const Product = require("../models/product");
const Cart = require("../models/cart");
exports.postAddProduct = async (req, res, next) => {
  const { title, img, price, desc } = req.body;

  const product = new Product(title, img, price, desc,req.user.UserID);
  const result = await product.saveProduct();
  res.render("admin/add-product", {
    docTitle: "Add Product",
    status: result.success,
    showMessage: true,
  });
};

exports.getAdminProducts = async (req, res, next) => {
  const result = await Product.fetchItems();
  res.render("admin/products", {
    docTitle: "Admin Products",
    path: "/admin/products",
    prods: result.products,
    err: result.error,
  });
};

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "add product",
    path: "/admin/add-product",
    showMessage: false,
  });
};

exports.getEditProduct = async (req, res) => {
  const prodId = req.params.id;
  const product = await Product.FindByID(prodId);
  console.log(product[0]);
  res.render("admin/edit-product", {
    docTitle: "Edit Product",
    prod: product[0],
  });
};
exports.postEditProduct = async (req, res) => {
  await Product.editProduct(req.body);
  res.redirect("/admin/products");
};
exports.postDeleteProduct = async (req, res) => {
  const prodID = req.body.id;
  const result = await Product.deleteItem(prodID);
  res.redirect("/admin/products");
};

const Product = require("../models/product");
const Cart = require("../models/cart");
exports.postAddProduct = async (req, res, next) => {
  const { title, price, desc } = req.body;
  const img = req.file;
  let imgPath=null;
  if (img) {
    imgPath = img.path;
    console.log(img)
  } else {
    //show error about image
    req.flash("error", "Invalid Image file");
    res.redirect("/admin/add-product");
  }
  const product = new Product(title, imgPath, price, desc, req.session.user);
  const result = await product.saveProduct();
  if (result===true) {
    req.flash("success", "Product added succesfully");
    res.redirect("/admin/add-product");
  }else{
    req.flash("error", "Error while saving product, please contact Administrator");
    res.redirect("/admin/add-product");
  }
};

exports.getAdminProducts = async (req, res, next) => {
  const result = await Product.fetchAdminProducts(req.session.user);
  const errorMsg = req.flash("error")[0];
  const successMsg = req.flash("success")[0];
  res.render("admin/products", {
    docTitle: "Admin Products",
    path: "/admin/products",
    prods: result.products,
    msg: result.msg,
    errorMsg,
    successMsg
  });
};

exports.getAddProduct = (req, res) => {
  const errorMsg = req.flash("error")[0];
  const successMsg = req.flash("success")[0];
  res.render("admin/add-product", {
    docTitle: "add product",
    path: "/admin/add-product",
    errorMsg,
    successMsg,
  });
};

exports.getEditProduct = async (req, res) => {
  const prodId = req.params.id;
  const product = await Product.FindByID(prodId);
  const updateMsg = req.flash("success")[0];
  res.render("admin/edit-product", {
    docTitle: "Edit Product",
    prod: product[0],
    updateMsg,
  });
};
exports.postEditProduct = async (req, res) => {
  const {id,title,price,description}=req.body;
  const img=req.file.path;
  console.log(img)
  console.log(req.body)
  await Product.editProduct(id,title,price,description,img);
  req.flash("success", "Product Updated");
  res.redirect("/admin/products");
};
exports.postDeleteProduct = async (req, res) => {
  const prodID = req.body.id;
  const uid = req.session.user;
  await Product.deleteItem(prodID, uid);
  req.flash("success", "Product Deleted");
  res.redirect("/admin/products");
};

const Product = require("../models/product");
const Cart = require("../models/cart");
const cache = require("memory-cache");
const CACHE_KEY = "products";
const CACHE_TIME = 5 * 60 * 1000;
const path=require('../util/path');
const fs=require('fs')
exports.getProducts = async (req, res, next) => {
  const cachedProducts = cache.get(CACHE_KEY);
  const successMsg = req.flash("success")[0];
  if (cachedProducts) {
    return res.render("shop/product-list", {
      prods: cachedProducts,
      docTitle: "All Products",
      path: "/products",
      successMsg,
    });
  }
  const result = await Product.fetchItems();
  if (result.error) {
    return res.render("shop/product-list", {
      docTitle: "All Products",
      path: "/products",
      err: result.error,
      successMsg,
    });
  }
  cache.put(CACHE_KEY, result.products, CACHE_TIME);
  res.render("shop/product-list", {
    prods: result.products,
    docTitle: "All Products",
    path: "/products",
    err: result.error,
    successMsg,
  });
};

exports.getProduct = async (req, res) => {
  const prodID = req.params.productID;
  const product = await Product.FindByID(prodID);
  res.render("shop/product-detail", {
    product: product[0],
    docTitle:  product[0].ProductName,
  });
};
exports.getIndex = (req, res, next) => {
  const csrfToken = res.locals.csrfToken;
  res.render("shop/index", {
    docTitle: "Shop",
    path: "/",
  });
};

exports.getCart = async (req, res) => {
  console.log("Fetching cart");
  const userid = req.session.user;
  const cartProducts = await Cart.getCartProducts(userid);
  res.render("shop/cart", {
    docTitle: "Your Cart",
    prods: cartProducts[0],
    total: cartProducts[1][0].CartTotal,
    userId: userid,
    path: "/cart",
  });
};
exports.postCart = async (req, res) => {
  const prodID = req.body.productID;
  const uid = req.session.user;
  await Cart.addProduct(parseInt(prodID), parseInt(uid));
  req.flash("success", "Product Added to cart");
  res.redirect("products");
};
exports.deleteCart = async (req, res) => {
  const id = req.body.id;
  const uid = req.session.user;
  await Cart.deleteItemFromCart(id, parseInt(uid));
  res.redirect("/cart");
};
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
exports.getOrders = async (req, res) => {
  const orders = await Cart.fetchOrders(req.session.user);
  return res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
    orders
  });
};

exports.postOrder = async (req, res) => {
  const uid = req.session.user;
  await Cart.moveToOrder(uid);
  res.redirect("/orders");
};


exports.getInvoice=(req,res)=>{
  const uid=req.params.uid;
  const oid=req.params.oid;
  const fileLoc=path+'/images/hello.png';
  if(uid==req.session.user){
    fs.readFile(fileLoc,(err,data)=>{
      if(!err){
        return res.send(data)
      }
    })
    
  }
  res.redirect('/orders')
}
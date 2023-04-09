const Product = require("../models/product");
const Cart = require("../models/cart");
const cache=require('memory-cache');
const CACHE_KEY='products';
const CACHE_TIME=5*60*1000;
exports.getProducts = async (req, res, next) => {
  const cachedProducts=cache.get(CACHE_KEY);
  if(cachedProducts){
    return res.render("shop/product-list", {
      prods: cachedProducts,
      docTitle: "All Products",
      path: "/products",
      isAuthenticate: req.session.isAuthenticate,
    });
  }
  const result = await Product.fetchItems();
  if(result.error){
    return res.render("shop/product-list", {
      docTitle: "All Products",
      path: "/products",
      err: result.error,
      isAuthenticate: req.session.isAuthenticate,
    });
  }
  cache.put(CACHE_KEY,result.products,  CACHE_TIME);
  res.render("shop/product-list", {
    prods: result.products,
    docTitle: "All Products",
    path: "/products",
    err: result.error,
    isAuthenticate: req.session.isAuthenticate,
  });
};

exports.getProduct = async (req, res) => {
  const prodID = req.params.productID;
  const product = await Product.FindByID(prodID);
  res.render("shop/product-detail", {
    product: product[0],
    docTitle: "/products/" + product[0].ProductName,
    isAuthenticate: req.session.isAuthenticate,
  });
};
exports.getIndex = (req, res, next) => {
  console.log(req.session.isAuthenticate)
  res.render("shop/index", {
    docTitle: "Shop",
    path: "/",
    isAuthenticate: req.session.isAuthenticate,
  });
};

exports.getCart = async (req, res) => {
  console.log("Fetching cart")
  const userid = req.session.user;
  const cartProducts = await Cart.getCartProducts(userid);
  res.render("shop/cart", {
    docTitle: "Your Cart",
    prods: cartProducts[0],
    total: cartProducts[1][0].CartTotal,
    userId: userid,
    path: "/cart",
    isAuthenticate: req.session.isAuthenticate,
  });
};
exports.postCart = async (req, res) => {
  const prodID = req.body.productID;
  const uid = req.session.user;
  await Cart.addProduct(parseInt(prodID), parseInt(uid));
  res.redirect("/cart");
};
exports.deleteCart = async (req, res) => {
  const id = req.body.id;
  const uid = req.session.user;
  await Cart.deleteItemFromCart(id, parseInt(uid));
  res.redirect("/cart");
  isAuthenticate: req.session.isAuthenticate;
};
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
    isAuthenticate: req.session.isAuthenticate,
  });
};
exports.getOrders = async (req, res) => {
  const orders = await Cart.fetchOrders(req.session.user);
  console.log(JSON.stringify(orders));
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
    orders: orders,
    isAuthenticate: req.session.isAuthenticate,
  });
};

exports.postOrder = async (req, res) => {
  const uid = req.session.user;
  await Cart.moveToOrder(uid);
  res.redirect("/orders");
};

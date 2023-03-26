const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = async (req, res, next) => {
  const result = await Product.fetchItems();
  res.render("shop/product-list", {
    prods: result.products,
    docTitle: "All Products",
    path: "/products",
    err: result.error,
    isAuthenticate:false
  });
};

exports.getProduct = async (req, res) => {
  const prodID = req.params.productID;
  const product = await Product.FindByID(prodID);
  res.render("shop/product-detail", {
    product: product[0],
    docTitle: "/products/" + product[0].ProductName,
    isAuthenticate:false
  });
};
exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    docTitle: "Shop",
    path: "/",
    isAuthenticate:false
  });
};

exports.getCart = async (req, res) => {
  const cartProducts = await Cart.getCartProducts();
  const userid=req.user.UserID
  res.render("shop/cart", {
    docTitle: "Your Cart",
    prods: cartProducts[0],
    total:cartProducts[1][0].CartTotal,
    userId:userid,
    path:'/cart',
    isAuthenticate:false
  });
};
exports.postCart = async (req, res) => {
  const prodID = req.body.productID;
  const uid=req.user.UserID
  await Cart.addProduct(parseInt(prodID),parseInt(uid));
  res.redirect("/cart");
  isAuthenticate:false
};
exports.deleteCart = async (req, res) => {
  const id = req.body.id;
  const uid=req.user.UserID
  await Cart.deleteItemFromCart(id,parseInt(uid));
  res.redirect("/cart");
  isAuthenticate:false
};
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
    isAuthenticate:false
  });
};
exports.getOrders =async (req, res) => {
  const orders=await Cart.fetchOrders(req.user.UserID)
  console.log(JSON.stringify(orders))
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
    orders:orders,
    isAuthenticate:false
  });
};

exports.postOrder=async (req,res)=>{
  const uid=req.body.userid;
  await Cart.moveToOrder(uid);
  res.redirect('/orders')
}
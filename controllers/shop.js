const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = async (req, res, next) => {
  const result = await Product.fetchItems();
  res.render("shop/product-list", {
    prods: result.products,
    docTitle: "All Products",
    path: "/products",
    err: result.error,
  });
};

exports.getProduct = async (req, res) => {
  const prodID = req.params.productID;
  const product = await Product.FindByID(prodID);
  res.render("shop/product-detail", {
    product: product[0],
    docTitle: "/products/" + product[0].ProductName,
  });
};
exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    docTitle: "Shop",
    path: "/",
  });
};

exports.getCart = async (req, res) => {
  const cartProducts = await Cart.getCartProducts();
  console.log(cartProducts);
  res.render("shop/cart", {
    docTitle: "Your Cart",
    prods: cartProducts[0],
    total:cartProducts[1][0].CartTotal
  });
};
exports.postCart = async (req, res) => {
  const prodID = req.body.productID;
  await Cart.addProduct(parseInt(prodID));
  res.redirect("/cart");
};
exports.deleteCart = async (req, res) => {
  const id = req.body.id;
  await Cart.deleteItemFromCart(id);
  res.redirect("/cart");
};
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
  });
};

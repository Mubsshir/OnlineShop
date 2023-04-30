const Product = require("../models/product");
const Cart = require("../models/cart");
const path = require("../util/path");
const fs = require("fs");
const pdfkit = require("pdfkit");
exports.getProducts = async (req, res, next) => {
  const page = req.query.page;
  const countInfo = await Product.getProductsCount();
  console.log(countInfo);
  const productCount = countInfo.ProductsCount;
  const perPageview = countInfo.ProductPerPage;

  const successMsg = req.flash("success")[0];

  const result = await Product.fetchItems((page - 1) * 3);
  if (result.error) {
    return res.render("shop/product-list", {
      docTitle: "All Products",
      path: "/products?page="+page,
      err: result.error,
      successMsg,
      count: productCount,
      perPageview,
      page,
    });
  }
  return res.render("shop/product-list", {
    prods: result.products,
    docTitle: "All Products",
    count: productCount,
    perPageview,
    path: "/products?page="+page,
    err: result.error,
    successMsg,
    page,
  });
};

exports.getProduct = async (req, res) => {
  const prodID = req.params.productID;
  const product = await Product.FindByID(prodID);
  return res.render("shop/product-detail", {
    product: product[0],
    docTitle: product[0].ProductName,
  });
};
exports.getIndex = (req, res, next) => {
  const csrfToken = res.locals.csrfToken;
  return res.render("shop/index", {
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
  const page=req.body.page;
  await Cart.addProduct(parseInt(prodID), parseInt(uid));
  req.flash("success", "Product Added to cart");
  res.redirect("products?page="+page);
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
    orders,
  });
};

exports.postOrder = async (req, res) => {
  const uid = req.session.user;
  await Cart.moveToOrder(uid);
  res.redirect("/orders");
};

exports.getInvoice = async (req, res) => {
  const uid = parseInt(req.params.uid);
  const oid = req.params.oid;
  let fileName = "invoice_" + oid + ".pdf";
  const fileLoc = path + "\\images\\invoice\\" + fileName;
  if (uid === req.session.user) {
    const orders = await Cart.fetchOrders(uid);
    const order = orders[oid];
    const doc = new pdfkit();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="' + fileName + '"');
    // Set up the font and font size for the document
    doc.font("Helvetica-Bold");
    doc.fontSize(14);

    // Add a title to the document
    doc.text("INVOICE", { align: "center" });

    // Add a header section
    doc.moveDown();
    doc.text("Your Company Name", { align: "center" });
    doc.text("Your Company Address", { align: "center" });
    doc.text("Your Company Phone", { align: "center" });

    // Add a section for customer information
    doc.moveDown();
    doc.text("Bill To:", { underline: true });

    // Add a section for order information
    doc.moveDown();
    doc.text(`Order Date: ${order.Date}`);
    doc.text(`Order ID: ${oid}`);

    // Add a table with order details
    doc.moveDown();
    doc.font("Helvetica-Bold");
    doc.text("Product Name", { width: 250 });
    doc.text("Price", { width: 100, align: "right" });
    doc.text("Quantity", { width: 100, align: "right" });
    doc.text("Total", { width: 100, align: "right" });
    doc.moveDown();
    order.Products.forEach((product) => {
      doc.text(product["Product Name"], { width: 250 });
      doc.text(product.ProductPrice.toFixed(2), { width: 100, align: "right" });
      doc.text(product.Qty.toString(), { width: 100, align: "right" });
      doc.text((product.ProductPrice * product.Qty).toFixed(2), {
        width: 100,
        align: "right",
      });
      doc.moveDown();
    });
    doc.font("Helvetica");
    // Add a section for the total
    doc.font("Helvetica-Bold");
    doc.text("Total:", { width: 350, align: "right" });
    doc.text(order.Total.toFixed(2), { width: 100, align: "right" });

    // End the document and close the stream
    doc.end();
    doc.pipe(fs.createWriteStream(fileLoc));
    doc.pipe(res);
  } else {
    res.redirect("/login");
  }
};

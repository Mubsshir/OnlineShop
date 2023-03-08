const rootDir = require("../util/path");
const fs = require("fs");
const path = require("path");
const Product = require("./product");
const { parse } = require("path");
const p = path.join(rootDir, "data", "cart.json");
const {sql,pool,connect}=require('../util/database')


const getCart = (cb) => {
  fs.readFile(p, (err, content) => {
    if (!err && content.length > 0) {
      let cart = JSON.parse(content);
      return cb(cart);
    } else {
      return cb([]);
    }
  });
};
class Cart {
  static  async addProduct(id) {
    try{
      await connect();
      const request= await pool.request();
      request.input('productId',id)
      request.output('rowAffected',sql.Int);
      const result=await request.execute('USP_AddToCart');
      const rowAffected=result.output.rowAffected;
      console.log("ID: "+ id)
      if(rowAffected>0){
        console.log("Product Added to cart")
      }else{
        throw new Error("Somthing went wrong.Product not added to cart");
      }
    }catch(err){
      console.log("Error "+err)
    }
  }

  static async getCartProducts() {
    try {
      await connect();
      const request=await pool.request();
      request.output('rowAffected',sql.Int);
      const result=await request.execute('USP_GetCartItems');
      const rowAffected=result.output.rowAffected;
      if(rowAffected>0){
        return result.recordsets;
      }else{
        throw new Error("Somthing went wrong while fetching cart records");
      }
    } catch (error) {
      console.log("Error "+error);
      return [];
    }
  }
  static async deleteItemFromCart(id) {
   try {
    await connect();
    const request=await pool.request();
    request.input('cartID',id);
    request.output('rowAffected',sql.Int);
    const result=await request.execute('USP_DeleteFromCart');
    if(result.output.rowAffected>0){
      console.log("Product Deleted From Cart");
    }else{
      throw new Error("Somthing went wrong while deleting the product from cart.")
    }
   } catch (err) {
    console.log("Error : "+err);
   }
  }
}
module.exports = Cart;
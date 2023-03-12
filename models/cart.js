const { sql, pool, connect } = require("../util/database");

class Cart {
  static async addProduct(id, uid) {
    try {
      await connect();
      const request = await pool.request();
      request.input("productId", id);
      request.input("uid", uid);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_AddToCart");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      if (rowAffected > 0) {
        console.log("Product Added to cart");
      } else {
        throw new Error("Somthing went wrong.Product not added to cart");
      }
    } catch (err) {
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log("Error " + err);
    }
  }

  static async getCartProducts() {
    try {
      await connect();
      const request = await pool.request();
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_GetCartItems");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      if (rowAffected > 0) {
        return result.recordsets;
      } else {
        throw new Error("Somthing went wrong while fetching cart records");
      }
    } catch (error) {
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log("Error " + error);
      return [];
    }
  }
  static async deleteItemFromCart(id, uid) {
    try {
      await connect();
      const request = await pool.request();
      request.input("cartID", id);
      request.input("uid", uid);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_DeleteFromCart");
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      if (result.output.rowAffected > 0) {
        console.log("Product Deleted From Cart");
      } else {
        throw new Error(
          "Somthing went wrong while deleting the product from cart."
        );
      }
    } catch (err) {
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log("Error : " + err);
    }
  }
}
module.exports = Cart;

const { sql, pool, connect } = require("../util/database");
const crypto=require('crypto');
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

  static async getCartProducts(uid) {
    try {
      await connect();
      const request = await pool.request();
      request.input('uid',uid);
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
        throw new Error("This user dosen't have anything in the cart");
      }
    } catch (error) {
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
  static async moveToOrder(uid) {
    try {
      const oid=crypto.randomUUID();
      await connect();
      const request = await pool.request();
      request.input('orderID',oid);
      request.input("uid", uid);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_MoveToOrder");
      const rowAffected = result.output.rowAffected;
      pool.close();
      if (rowAffected > 0) {
        console.log("Order created");
      } else {
        throw new Error("Somthing went wrong unable to place order");
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  }
 
  static async fetchOrders(uid) {
    try {
      await connect();
      const request = await pool.request();
      request.input("uid", uid);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_GetOrders");
      const rowAffected = result.output.rowAffected;
      if (rowAffected === 0) {
        return [];
      } 
      const ordersByID = {};
      result.recordsets[0].forEach((order) => {
        const OrderID = order["OrderID"]
        const ODate = order["Date"]
        ordersByID[OrderID] = ordersByID[OrderID] || {};
        if(!ordersByID[OrderID].Date){
          ordersByID[OrderID].Date=ODate
        }
        if(!ordersByID[OrderID].Products){
          ordersByID[OrderID].Products=[]
        }
        if(!ordersByID[OrderID].Total){
          ordersByID[OrderID].Total=0
        }
        const orderDetails={"UID":order.UserId,"Product Name":order.ProductName,"Qty":order.Qty}
        ordersByID[OrderID].Products.push(orderDetails)           
      });
      console.log(ordersByID)
      const ordersTotalByOID = result.recordsets[1];
      const productsByID = Object.entries(ordersByID).map(([OrderID, orders]) => ({
        OrderID,
        products: orders.map((order) => ({ ...order, ["OrderID"]: OrderID })),
        total: ordersTotalByOID[OrderID] || 0,
      }));
      return productsByID;
    } catch (err) {
      console.log("Error: " + err);
      return [];
    }
  }
}
module.exports = Cart;

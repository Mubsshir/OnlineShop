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
      await connect();
      const request = await pool.request();
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
      console.log(result.recordsets+" "+uid)
      console.log("In fetching order");
      console.log(rowAffected);
      if (rowAffected === 0) {
        return [];
      }
      const ordersByDate = {};
      result.recordsets[0].forEach((order) => {
        const orderDate = new Date(order["Order Date"]).toISOString().slice(0, 10);
        ordersByDate[orderDate] = ordersByDate[orderDate] || [];
        ordersByDate[orderDate].push(order);
      });
      const ordersTotalByDate = {};
      result.recordsets[1].forEach((data) => {
        const orderDate = new Date(data.OrderDate).toISOString().slice(0, 10);
        ordersTotalByDate[orderDate] = data.Total;
      });
      const productsByDate = Object.entries(ordersByDate).map(([orderDate, orders]) => ({
        order_date:orderDate,
        products: orders.map((order) => ({ ...order, ["Order Date"]: orderDate })),
        total: ordersTotalByDate[orderDate] || 0,
      }));
      return productsByDate;
    } catch (err) {
      console.log("Error: " + err);
      return [];
    }
  }
}
module.exports = Cart;

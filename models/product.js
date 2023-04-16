const { Int } = require("mssql");
const { pool, sql, connect } = require("../util/database");

class Product {
  constructor(title, imgUrl, price, description, userID) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
    this.userID = userID;
  }

  async saveProduct() {
    try {
      await connect();
      const request = await pool.request();
      request.input("title", this.title);
      request.input("price", this.price);
      request.input("desc", this.description);
      request.input("img", this.imgUrl);
      request.input("uid", this.userID);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_AddProduct");
      const rowAffected = result.output.rowAffected;
      if (rowAffected > 0) {
        return true;
      } else {
        throw new Error("Product not saved in Database,Somthing went wrong");
      }
    } catch (err) {
      console.log(`error while saving product to database: ${err}`);
      return false;
    }
  }
  static async fetchItems() {
    try {
      await connect();
      const request = await pool.request();
      const result = await request.execute("USP_GetProducts");
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log(result.recordset);
      return { products: result.recordset, error: false };
    } catch (err) {
      console.log(err + " :while connecting to db");
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      return { products: [], error: true };
    }
  }
  static async fetchAdminProducts(uid) {
    try {
      await connect();
      const request = await pool.request();
      request.input("uid", uid);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_GetAdminProd");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (rowAffected > 0) {
        return { products: result.recordset, error: false };
      }
      return {
        products: [],
        error: "success",
        msg: "You did not add any product yet",
      };
    } catch (err) {
      console.log(err + " :while connecting to db");
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      return {
        products: [],
        error: "failed",
        msg: "Error while fetiching data, contact Administrator",
      };
    }
  }

  static async FindByID(id) {
    try {
      await connect();
      const request = await pool.request();
      request.input("id", id);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_FindProduct");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      return result.recordset;
    } catch (err) {
      console.log("Error : " + err);
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      return {};
    }
  }
  static async editProduct(id,title,price,description,imgUrl) {
    try {
      await connect();
      const request = await pool.request();
      request.input("id", parseInt(id));
      request.input("title", title);
      request.input("price", price);
      request.input("desc", description);
      request.input("img", imgUrl);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_UpdateProduct");
      const rowAffected = result.output.rowAffected;
      if (rowAffected > 0) {
        console.log("Prouduct Updated SuccessFullly");
        return { success: true };
      } else {
        throw new Error("Product not updated,Somthing went wrong");
      }
    } catch (err) {
      console.log("Error : " + err);
      return { success: false };
    }
  }

  static async deleteItem(id, uid) {
    try {
      await connect();
      const request = await pool.request();
      request.input("id", id);
      request.input("uid", uid);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_DeleteProduct");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      if (rowAffected > 0) {
        return { success: true };
      } else {
        throw new Error(
          "Product not deleted from the Database,Somthing went wrong"
        );
      }
    } catch (err) {
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log("Error: " + err);
      return { success: false };
    }
  }
}

module.exports = Product;

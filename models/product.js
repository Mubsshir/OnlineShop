const { pool, sql, connect } = require("../util/database");

class Product {
  constructor(title, imgUrl, price, description,userID) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
    this.userID=userID
  }

  async saveProduct() {
    try {
      await connect();
      const request = await pool.request();
      request.input("title", this.title);
      request.input("price", this.price);
      request.input("desc", this.description);
      request.input("img", this.imgUrl);
      request.input('uid',this.userID);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_AddProduct");
      const rowAffected = result.output.rowAffected;
      if (rowAffected > 0) {
        return { success: true };
      } else {
        throw new Error("Product not saved in Database,Somthing went wrong");
      }
    } catch (err) {
      console.log(`error while saving product to database: ${err}`);
      return { success: false };
    }
  }
  static async fetchItems() {
    try {
      await connect();
      const request = await pool.request();
      const result = await request.execute("USP_GetProuducts");
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      return { products: result.recordset, error: false };
    } catch (err) {
      console.log(err + " :while connecting to db");
      return { products: [], error: true };
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
      console.log(rowAffected);
      return result.recordset;
    } catch (err) {
      console.log("Error : " + err);
      return {};
    }
  }
  static async editProduct(product) {
    try {
      await connect();
      const request = await pool.request();
      request.input("id", product.id);
      request.input("title", product.title);
      request.input("price", product.price);
      request.input("desc", product.description);
      request.input("img", product.imgUrl);
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

  static async deleteItem(id) {
    try {
      await connect();
      const request = await pool.request();
      request.input("id", id);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_DeleteProduct");
      const rowAffected = result.output.rowAffected;
      if (rowAffected > 0) {
        return { success: true };
      } else {
        throw new Error(
          "Product not deleted from the Database,Somthing went wrong"
        );
      }
    } catch (err) {
      console.log("Error: " + err);
      return { success: false };
    }
  }
}

module.exports = Product;

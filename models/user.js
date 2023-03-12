const { connect, pool, sql } = require("../util/database");

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  async save() {
    try {
      await connect();
      const request = await pool.request();
      request.input("name", this.name);
      request.input("email", this.email);
      console.log(this);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_SaveUser");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      if (rowAffected > 0) {
        console.log("User Created");
      } else {
        throw new Error("Somthing went wrong unable to create user");
      }
    } catch (err) {
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log("Error : " + err);
    }
  }
  static async FindById(id) {
    try {
      await connect();
      const request = await pool.request();
      request.input("id", id);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_FindUser");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      if (rowAffected > 0) {
        console.log("User Find");
        return result.recordset[0];
      } else {
        throw new Error("Somthing went wrong unable to find user");
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

module.exports = User;

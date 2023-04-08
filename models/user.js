const e = require("express");
const { connect, pool, sql } = require("../util/database");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async save() {
    try {
      await connect();
      const request = await pool.request();
      request.input("email", this.email);
      request.input("pass", this.password);
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
  static async FindById(id, result = true) {
    try {
      await connect();
      const request = await pool.request();
      request.input("email", email);
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
        if (result) {
          return result.recordset[0];
        } else {
          return true;
        }
      } else {
        throw new Error("Somthing went wrong unable to find user");
      }
    } catch (err) {
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log("Error : " + err);
      if (result) {
        return [];
      } else {
        return false;
      }
    }
  }

  static async fetchUserPass(email) {
    try {
      await connect();
      const request = await pool.request();
      request.input("email", email);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_GetUserInfo");
      const rowAffected = result.output.rowAffected;
      if (rowAffected > 0) {
        return { result: result.recordset[0].password,userID:result.recordset[0].UserID};
      } else {
        return { result: false };
      }
    } catch (err) {
      console.log("Error while looking for user in database: " + err);
      return { result: false };
    }
  }
  static async FindByEmail(email, result = false) {
    try {
      await connect();
      const request = await pool.request();
      request.input("email", email);
      request.input("id", -1);
      request.output("rowAffected", sql.Int);
      const result = await request.execute("USP_FindUser");
      const rowAffected = result.output.rowAffected;
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      if (rowAffected > 0) {
        console.log("User Find");
        if (result) {
          return result.recordset[0];
        } else {
          return true;
        }
      } else {
        throw new Error("Somthing went wrong unable to find user");
      }
    } catch (err) {
      await pool.close();
      if (!pool.connected) {
        console.log("Database connetion closed.");
      }
      console.log("While Finding user by email : " + err);
      if (result) {
        return [];
      } else {
        return false;
      }
    }
  }
}

module.exports = User;

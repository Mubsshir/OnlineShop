const Sequelize = require("sequelize");
const { config } = require("./database");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { DataTypes } = require("sequelize");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: "MUBASSHIR-PC",
  port: 1433, 
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      trustedConnection: true
    },
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database established");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  
const Session = sequelize.define("Session", {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expires: DataTypes.DATE,
  data: DataTypes.TEXT,
});

const store = new SequelizeStore({
  db: sequelize,
  table: "Session",
  checkExpirationInterval: 5*60 *1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 15*60 * 1000, // The maximum age (in milliseconds) of a valid session.
});

module.exports = { session, store };

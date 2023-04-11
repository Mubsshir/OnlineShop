const sql = require("mssql");

const config = {
  server: 'MUBASSHIR-PC',
  database: "mubsshir_shop",
  user: "mubsshir",
  password: "112233",
  port: 1433,
  options: {
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};


const pool = new sql.ConnectionPool(config);

const connect = async () => {
  try {
    await pool.connect();
    if (pool.connected) {
      console.log("Connection to database established");
    } else {
      console.log("Connection failed");
    }
  } catch (err) {
    console.log("error while connecting to database: "+ err);
  }
};

module.exports = { sql, pool, connect ,config};

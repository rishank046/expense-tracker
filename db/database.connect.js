import mysql from "mysql2";
import "dotenv/config";
import fs from "node:fs";

const databaseServer = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  enableKeepAlive: true,
  waitForConnections: true,
  connectTimeout: 10000,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync("./ca.pem"),
  },
});

export default databaseServer.promise();

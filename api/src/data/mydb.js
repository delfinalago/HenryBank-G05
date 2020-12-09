const mysql = require("mysql");
require("dotenv").config();
const dataCreate = require("./tables.js");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  multipleStatements: true,
});
con.connect((err) => {
  if (err) throw err;
  con.query(`DROP DATABASE ${DB_NAME}`, (error) => {
    if (error) throw error;
    return "Database Droped";
  });
  con.query(`CREATE DATABASE ${DB_NAME}`, (error) => {
    if (error) throw error;
    dataCreate(con);
  });
});

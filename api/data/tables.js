require("dotenv").config();
const path = require("path");
const fs = require("fs");
const tables = fs.readFileSync(path.join(__dirname, "./tables.sql")).toString();
const { DB_NAME } = process.env;
console.log(DB_NAME)
function dataCreate(con) {
  con.query(`USE ${DB_NAME}`, (error) => {
    if (error) throw error;
    return "Create Table";
  });
  con.query(tables, (error) => {
    if (error) throw error;
    return "Create Table";
  });
  con.end();
}
module.exports = dataCreate;

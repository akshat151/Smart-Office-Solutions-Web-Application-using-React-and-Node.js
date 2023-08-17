const mysql = require("mysql2");

const HOST = "127.0.0.1";
const PORT = 3306;

var connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MYSQL Connected! @ " + process.env.PORT);
  connection.query(
    "CREATE DATABASE IF NOT EXISTS officeDB",
    function (err, result) {
      if (err) throw err;
      console.log(process.env.DB + "- Database created.");
    },
  );
});
module.exports = connection;

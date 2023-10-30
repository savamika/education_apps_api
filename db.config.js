'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'u1579389_privbook',
  password : 'Bismillah@123@123',
  database : 'u1579389_privbook_db'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
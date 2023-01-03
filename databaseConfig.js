const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database
});

db.on('error', function (err) {
    console.log('caught this error: ' + err.toString());
});

module.exports = db
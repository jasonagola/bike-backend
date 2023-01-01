const mysql = require('mysql')

const db = mysql.createPool({
    connectionLimit: 10,
    host:'191.101.79.52',
    user: 'u844101523_localbikeshop',
    password: 'PizzaParty69!',
    database: 'u844101523_bikeShopdb'
});

db.on('error', function (err) {
    console.log('caught this error: ' + err.toString());
});

module.exports = db
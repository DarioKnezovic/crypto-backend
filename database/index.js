const mysql = require('mysql');
const database = require('../config/database');
const currencyRates = require('./currency-rates.js');

module.exports = {
    pool: mysql.createPool({
        connectionLimit : 10,
        host            : database.HOST,
        user            : database.USER,
        password        : database.PASSWORD,
        database        : database.NAME
    }),
}

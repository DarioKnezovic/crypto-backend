const mysql = require('mysql');
const database = require('../config/database');

const pool = mysql.createPool({
     connectionLimit : 10,
     host            : database.HOST,
     port            : database.PORT,
     user            : database.USER,
     password        : database.PASSWORD,
     database        : database.NAME
});

module.exports = {
    getConnection: (callback) => {
        return pool.getConnection(callback);
    }
}

const db = require('./index.js');

/*
 * Migrating table 'currency_rates' if not exists.
 *
 * @return void
 */
const migrateTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS currency_rates (
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        base VARCHAR(20) NOT NULL,
        currency_one_name VARCHAR(20) NOT NULL,
        currency_one_rate FLOAT NOT NULL,
        currency_two_name VARCHAR(20) NOT NULL,
        currency_two_rate FLOAT NOT NULL,
        PRIMARY KEY(time)
    )`;

    db.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(query, (error) => {
            if (error) throw error;
            console.log("[MySQL] Table currency_rates is migrated.")
        })
        conn.release()
    });
};

/*
 * Inserting fetched data from API in database.
 * @param data Object
 *
 * @return void
 */
const insertCurrencyRate = (data, callback) => {
    const queryInsert = `INSERT INTO currency_rates (time, base, currency_one_name, currency_one_rate, currency_two_name, currency_two_rate)
    VALUES ('${data.time}', '${data.base}', '${data.currency_one_name}', ${data.currency_one_rate}, '${data.currency_two_name}', ${data.currency_two_rate})`;

    db.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(queryInsert, (error) => {
            if (error) throw error;
            console.log("[MySQL] Table currency_rates is updated with new value.");
            return callback(data);
        })
        conn.release()
    })
}

/*
 * Get the latest currency rate from database
 * @param callback Function
 *
 * @return object
 */
const getLatestCurrencyRates = (callback) => {
    const selectQuery = `SELECT * FROM currency_rates ORDER BY time DESC LIMIT 1`;

    db.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(selectQuery, (error, result) => {
            if (error) throw error;
            return callback(result[0]);
        })
        conn.release()
    })
}

module.exports = {
    migrateTable,
    insertCurrencyRate,
    getLatestCurrencyRates
}

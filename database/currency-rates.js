let db = require('./index.js');

/*
 * Migrating table if not exists.
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
        conn.query(query, (error) => {
            if (error) throw error;
            console.log("[MySQL] Table currency_rates is migrated.")
        })
    });
};

/*
 * Inserting fetched data from API in database.
 * @param data Object
 *
 * @return void
 */
const insertCurrencyRate = (data) => {
    const queryInsert = `INSERT INTO currency_rates (base, currency_one_name, currency_one_rate, currency_two_name, currency_two_rate)
    VALUES ('${data.base}', '${data.currency_one_name}', ${data.currency_one_rate}, '${data.currency_two_name}', ${data.currency_two_rate})`;

    db.getConnection((err, conn) => {
        conn.query(queryInsert, (error) => {
            if (error) throw error;
            console.log("[MySQL] Table currency_rates is updated with new value.")
        })
    })
}

module.exports = {
    migrateTable,
    insertCurrencyRate
}

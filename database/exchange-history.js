const db = require('./index');

/*
 * Migrating table 'exchange-history' if not exists.
 *
 * @return void
 */
const migrateTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS exchange_history (
        exchange_id INT NOT NULL AUTO_INCREMENT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        currency_from VARCHAR(20) NOT NULL,
        amount_one FLOAT NOT NULL,
        currency_to VARCHAR(20) NOT NULL,
        amount_two FLOAT NOT NULL,
        type VARCHAR(20),
        PRIMARY KEY(exchange_id)
   )`;

    db.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(query, (error) => {
            if (error) throw error;
            console.log("[MySQL] Table exchange_history is migrated.")
        })
        conn.release()
    });
};

/*
 * Get all exchanges and prepare it for emitting.
 *
 * @return void
 */
const fetchAllExchanges = () => {
    const query = 'SELECT * FROM exchange_history';

    return new Promise((resolve, reject) => {
        db.getConnection((err, conn) => {
            if (err) throw reject(err);
            conn.query(query, (error, result) => {
                if (error) throw reject(error);
                resolve(result);
            })
            conn.release()
        })
    })
}

/*
 * Insert received exchange data in database.
 * @param data Object
 *
 * @return void
 */
const insertNewExchange = (data) => {
    const insertQuery = `INSERT INTO exchange_history (currency_from, amount_one, currency_to, amount_two, type)
                        VALUES ('${data.currency_from}', ${data.amount_one}, '${data.currency_to}', ${data.amount_two}, 'Exchanged')`;

    return new Promise((resolve, reject) => {
        db.getConnection((err, conn) => {
            if (err) throw reject(err);
            conn.query(insertQuery, (error, _) => {
                if (error) throw reject(error);
                resolve();
            })
            conn.release()
        })
    })
}

module.exports = {
    migrateTable,
    insertNewExchange,
    fetchAllExchanges
}

let db = require('./index.js');

const migrateTable = async () => {
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

module.exports = {
    migrateTable
}

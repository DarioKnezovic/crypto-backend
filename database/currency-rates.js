let database = require('./index.js');

const migrateTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS 'currency_rates' (
            'time' TIMESTAMP PRIMARY KEY CURRENT_TIMESTAMP,
            'base' VARCHAR(20) NOT  NULL,
            'currency_one_name' VARCHAR(20) NOT NULL,
            'currency_one_rate' FLOAT NOT NULL,
            'currency_two_name' VARCHAR(20) NOT NULL,
            'currency_two_rate' FLOAT NOT NULL,
    )`;

    console.log(database)
    /*connection.query(query, function (error) {
        if (error) throw error;
    })*/
}

module.exports = {
    migrateTable
}

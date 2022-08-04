const currencyRates = require('./currency-rates');
const exchangeHistory = require('./exchange-history');

/*
 * Trigger all database migrations.
 *
 * @return void
 */
const migrateTables = () => {
    currencyRates.migrateTable();
    exchangeHistory.migrateTable();
}

module.exports = {
    migrateTables
}

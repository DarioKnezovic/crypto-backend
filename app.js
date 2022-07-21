'use strict';

require('./database/index');
const express = require('express');
const server = require('./config/server');
const currency = require('./services/currency');
const currencyRates = require('./database/currency-rates');

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Server loaded');
});

currencyRates.migrateTable();
//currency.getCurrencyRates()

app.listen(server.PORT, server.HOST);
console.log(`Running on http://${server.HOST}:${server.PORT}`);

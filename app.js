'use strict';

const express = require('express');
const server = require('./config/server');
const currencyRates = require('./database/currency-rates');

// App
const app = express();

currencyRates.migrateTable();
//currency.getCurrencyRates()

app.listen(server.PORT, server.HOST);
console.log(`Running on http://${server.HOST}:${server.PORT}`);

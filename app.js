'use strict';

const express = require('express');
const server = require('./config/server');
const currencyRates = require('./database/currency-rates');
const currencyService = require('./services/currency');

// App
const app = express();

currencyRates.migrateTable();
currencyService.fetchCurrencyRatesFromApi()

app.listen(server.PORT, server.HOST);
console.log(`Running on http://${server.HOST}:${server.PORT}`);

'use strict';

const express = require('express');
const serverConfig = require('./config/server');
const http = require('http');
const socketIO = require('socket.io');
const currencyRates = require('./database/currency-rates');
const currencyService = require('./services/currency');

// App
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', () => {
    console.log("[Socket.IO] Someone is connected!");
});
currencyRates.migrateTable();
//currencyService.fetchCurrencyRatesFromApi()

server.listen(serverConfig.PORT);
console.log(`[INFO] Server is running on port: ${serverConfig.PORT}`);

'use strict';

const express = require('express');
const serverConfig = require('./config/server');
const socketConfig = require('./config/socket');
const http = require('http');
const socketIO = require('socket.io');
const currencyRates = require('./database/currency-rates');
const currencyService = require('./services/currency');
const currencyRatesSocket = require('./socket/currency-rates');
const migrations = require('./database/migrations');

// App
const app = express();
const server = http.createServer(app);
const io = socketIO(server, socketConfig.SERVER_OPTIONS);

io.on(socketConfig.EVENTS.CONNECTION, (socket) => {
    console.log("[Socket.IO] Someone is connected!");
    currencyRatesSocket.saveSocketClient(socket, () => {
        currencyRates.getLatestCurrencyRates(data => currencyRatesSocket.sendCurrencyRatesToClient(data));
        currencyRatesSocket.receiveSavedExchange();
        currencyRatesSocket.receiveOfferForAllExchanges();
    })
});

migrations.migrateTables();
//currencyService.fetchCurrencyRatesFromApi() TODO: Uncomment this

server.listen(serverConfig.PORT);
console.log(`[INFO] Server is running on port: ${serverConfig.PORT}`);

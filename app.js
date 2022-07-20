'use strict';

const express = require('express');
const server = require('./config/server');
const currency = require('./services/currency');

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Server loaded');
});

//currency.getCurrencyRates()

app.listen(server.PORT, server.HOST);
console.log(`Running on http://${server.HOST}:${server.PORT}`);

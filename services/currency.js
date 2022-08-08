const axios = require('axios');
const api = require('../config/api');
const currencyRates = require('../database/currency-rates');
const currencyRatesSocket = require('../socket/currency-rates');

const ETHEREUM = 'ETH';
const BITCOIN = 'BTC';
let interval = null;

/*
 * Fetch currency rates from RAPID API.
 *
 * @return void
 */
const fetchCurrencyRatesFromApi = () => {
    const options = {
        method: 'GET',
        url: api.RAPID_API_BASE_URL + '/rates',
        headers: {
            'X-RapidAPI-Key': api.RAPID_API_KEY,
            'X-RapidAPI-Host': api.RAPID_API_HOST
        }
    };

    axios.request(options)
        .then((response) => {
            handleCurrencyRatesData(response.data);
        })
        .catch((error) => {
            console.error(error);
        })

    clearInterval(interval);
    interval = setInterval(fetchCurrencyRatesFromApi, api.API_CALL_INTERVAL);
    return interval;
};

/*
 * Receive response data from API and prepare it for inserting in database.
 * @param data Object
 *
 * @return void
 */
const handleCurrencyRatesData = (data) => {
    if (!data) return;

    let databaseData = {};
    databaseData.base = data.base ?? '';

    if (data.rates) {
        databaseData.time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        databaseData.currency_one_name = data.rates[BITCOIN] ? BITCOIN : '';
        databaseData.currency_one_rate = data.rates[BITCOIN] ?? 0;
        databaseData.currency_two_name = data.rates[ETHEREUM] ? ETHEREUM : '';
        databaseData.currency_two_rate = data.rates[ETHEREUM] ?? 0;
    }

    currencyRates.insertCurrencyRate(databaseData, currencyRatesSocket.sendUpdatedCurrencyRatesToClient);
}

module.exports = {
    fetchCurrencyRatesFromApi,
}

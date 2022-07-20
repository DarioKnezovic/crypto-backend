const axios = require('axios');
const api = require('../config/api');

const fetchCurrencyRatesFromApi = () => {
    console.log("HEEEJ");
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
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
    return setInterval(fetchCurrencyRatesFromApi, api.API_CALL_INTERVAL);
}

const getCurrencyRates = () => {
    fetchCurrencyRatesFromApi();
}

module.exports = {
    getCurrencyRates: getCurrencyRates,
}

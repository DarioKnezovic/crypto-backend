const axios = require('axios');
const api = require('../config/api');

module.exports = {
    fetchCurrencyRatesFromApi: () => {
        /*setInterval(() => {
            axios.get(api.RAPID_API_BASE_URL + '/rates')
                .then((response) => {
                    console.log(response.data)
                })
        }, api.API_CALL_INTERVAL);*/
    }
}

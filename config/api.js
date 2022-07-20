const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    RAPID_API_BASE_URL: 'https://currencyapi-net.p.rapidapi.com',
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    RAPID_API_HOST: process.env.RAPID_API_HOST,
    API_CALL_INTERVAL: 1000 // miliseconds
}

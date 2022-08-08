module.exports = {
    SERVER_OPTIONS: {
        cors: {
            origin: '*'
        }
    },
    EVENTS: {
        CONNECTION: 'connection',
        LATEST_CURRENCY_RATES: 'currency_rates',
        SAVE_EXCHANGE: 'save_exchange',
        GET_EXCHANGES_HISTORY: 'get_exchanges_history',
        EXCHANGES_HISTORY: 'exchanges_history',
        CURRENCY_RATES_UPDATE: 'currency_rates_update'
    }
}

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
        EXCHANGES_HISTORY: 'exchanges_history'
    }
}

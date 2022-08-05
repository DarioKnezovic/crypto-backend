const socketConfig = require('../config/socket');
const exchangeHistoryDB = require('../database/exchange-history');

let socketClient = null;

/*
 * Save socket client globally.
 * @param socket SocketIO
 * @param callback Function
 *
 * @return function
 */
const saveSocketClient = (socket, callback) => {
    socketClient = socket;

    return callback();
}

/*
 * Emit the latest currency to frontend client
 * @param data Object
 *
 * @return void
 */
const sendCurrencyRatesToClient = (data) => {
    socketClient.emit(socketConfig.EVENTS.LATEST_CURRENCY_RATES, data)
}

/*
 * Receive exchanged data from frontend and prepare it for inserting in database
 *
 * @return void
 */
const receiveSavedExchange = () => {
    socketClient.on(socketConfig.EVENTS.SAVE_EXCHANGE, (data) => exchangeHistoryDB.insertNewExchange(data, sendHistoryOfExchanges))
}

/*
 * Handle event when client want all exchanges history.
 */
const receiveOfferForAllExchanges = () => {
    socketClient.on(socketConfig.EVENTS.GET_EXCHANGES_HISTORY, sendHistoryOfExchanges)
}

/*
 * Send exchanges history to client.
 *
 * @return void
 */
const sendHistoryOfExchanges = () => {
    exchangeHistoryDB.fetchAllExchanges((data) => {
        socketClient.emit(socketConfig.EVENTS.EXCHANGES_HISTORY, data)
    })
}

module.exports = {
    saveSocketClient,
    sendCurrencyRatesToClient,
    receiveSavedExchange,
    sendHistoryOfExchanges,
    receiveOfferForAllExchanges
}

const socketConfig = require('../config/socket');

/*
 * Emit the latest currency to frontend client
 * @param socket SocketIO client
 * @param data Object
 *
 * @return void
 */
const sendCurrencyRatesToClient = (socket, data) => {
    socket.emit(socketConfig.EVENTS.LATEST_CURRENCY_RATES, data);
}

module.exports = {
    sendCurrencyRatesToClient
}

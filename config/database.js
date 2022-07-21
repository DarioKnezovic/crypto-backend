const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HOST: process.env.MYSQLDB_HOST,
    PORT: process.env.MYSQLDB_DOCKER_PORT,
    USER: process.env.MYSQLDB_USER,
    PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
    NAME: process.env.MYSQLDB_DATABASE
}

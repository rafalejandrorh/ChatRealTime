// Probar el debug
//const debug = require('debug')('app:database');
const config = require('../Config');
const mysql = require('mysql2');
const connection = mysql.createConnection(config.databaseUrl);

console.log('Connected to database');
//debug('Connected to database');

module.exports = connection;
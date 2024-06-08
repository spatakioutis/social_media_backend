const mysql = require('mysql');
require('dotenv').config()

const database = mysql.createConnection({
    host: 'localhost',
    user: 'sofoklis',
    password: process.env.DB_PASSWORD,
    database: 'webapp_database'
});

module.exports = database;
const mysql = require('mysql')
//import config from '../config/config.js'

// MySQL
const pool = mysql.createConnection({
    //connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '1234567',
    database: 'ua-highschool'
})

pool.connect()
module.exports = pool
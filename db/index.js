const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '976127002pp',
    database: 'bookstore',
    port: 3306,
    insecureAuth: true
})

connection.connect((err) => {
    if(err){
        console.error(err);
        throw err;
    }
    console.log('Connected to Database!')
});

module.exports = connection;
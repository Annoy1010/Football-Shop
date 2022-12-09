import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '160402',
    database: 'SoccerShop',
});

export default db;

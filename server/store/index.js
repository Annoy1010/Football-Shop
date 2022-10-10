import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'SoccerShop',
});

export default db;

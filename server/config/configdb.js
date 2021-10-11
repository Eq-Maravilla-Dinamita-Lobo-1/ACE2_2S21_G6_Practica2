const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

connection.connect((error) => {
    if (error) {
        console.log({ message: error });
    } else {
        console.log("Conexion exitosa");
    }
});

module.exports = connection;

import mysql from "mysql2/promise";

const pool = mysql.createPool({
    uri: process.env.DATABASE_URL_WEB,
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool;
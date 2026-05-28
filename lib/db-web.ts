import mysql from "mysql2/promise";

const globalForMySQL = globalThis as unknown as {
    poolWeb: mysql.Pool | undefined;
};

const pool =
    globalForMySQL.poolWeb ??
    mysql.createPool({
        uri: process.env.DATABASE_URL_WEB,
        waitForConnections: true,
        connectionLimit: 10,
        ssl: {
            rejectUnauthorized: false,
        },
    });

if (process.env.NODE_ENV !== "production") {
    globalForMySQL.poolWeb = pool;
}

export default pool;
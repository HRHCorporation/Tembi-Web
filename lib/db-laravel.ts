import mysql from "mysql2/promise";

const globalForMySQL = globalThis as unknown as {
    poolLaravel: mysql.Pool | undefined;
};

const pool =
    globalForMySQL.poolLaravel ??
    mysql.createPool({
        uri: process.env.DATABASE_URL_LARAVEL,
        waitForConnections: true,
        connectionLimit: 10,
        ssl: {
            rejectUnauthorized: false,
        },
    });

if (process.env.NODE_ENV !== "production") {
    globalForMySQL.poolLaravel = pool;
}

export default pool;
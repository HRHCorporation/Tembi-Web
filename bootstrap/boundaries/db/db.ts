import { dbConfigs } from "@/bootstrap/configs/database-configs";
import mysql from "mysql2/promise";
export const dbPool = mysql.createPool({
  host: dbConfigs.host,
  port: dbConfigs.port,
  user: dbConfigs.user,
  password: dbConfigs.password,
  database: dbConfigs.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getDBConnection = async () => {
  try {
    const connection = await dbPool.getConnection();
    console.log("Dbnya dah konek bang");
    connection.release();
  } catch (error) {
    console.error("waduh bang, ", error);
    process.exit(1);
  }
}
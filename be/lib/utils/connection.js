import mysql from "mysql2/promise";

export async function connection() {
  try {
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URI,
    });

    return connection;
  } catch (err) {
    console.error(`Error! ${err.message}`);
  }
}

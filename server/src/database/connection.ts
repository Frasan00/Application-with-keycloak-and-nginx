import pg from "pg";
import dotenv from "dotenv";
dotenv.config();


const USER = process.env.POSTGRES_USER;
const HOST = process.env.POSTGRES_HOST;
const PASSWORD = process.env.POSTGRES_PASSWORD;
const DB = process.env.POSTGRES_DB;

const client = new pg.Client({
  user: USER,
  host: HOST,
  database: DB,
  password: PASSWORD,
  port: 5432
});

client.connect()
.then((res) => console.log("Connected to the database"))
.catch((err) => console.error(err));

export default client;
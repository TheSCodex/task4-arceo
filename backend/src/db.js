import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.SQLHOST,
  username: process.env.SQLUSER,
  password: process.env.SQLPASSWORD,
  port: process.env.SQLPORT,
  database: process.env.SQLDATABASE,
})


export default connection;
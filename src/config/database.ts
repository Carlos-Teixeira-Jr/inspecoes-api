import "pg";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// define MODE: "development" ou "production"
const MODE = process.env.MODE || "development";
const PREFIX = MODE === "production" ? "PROD" : "DEV";

function getEnv(key: string, fallback = "") {
  return process.env[`${PREFIX}_${key}`] || fallback;
}

console.log(process.env.PROD_DB_URL)

const sequelize = new Sequelize(
  `${process.env.PROD_DB_URL}`,
  {
    // host: process.env.PROD_DB_HOST,
    // port: Number(process.env.PROD_DB_PORT),
    dialect: "postgres",
    dialectModule: require("pg"),
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export default sequelize;

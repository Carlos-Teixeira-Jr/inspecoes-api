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

const sequelize = new Sequelize(
  getEnv("DB_NAME"),
  getEnv("DB_USER"),
  getEnv("DB_PASSWORD"),
  {
    host: getEnv("DB_HOST", "localhost"),
    port: Number(getEnv("DB_PORT", "5432")),
    dialect: "postgres",
    dialectModule: require("pg"),
    logging: false,
    dialectOptions:
      MODE === "production"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  }
);

export default sequelize;

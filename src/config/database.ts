import "pg";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isDev = process.env.MODE === "development";

const sequelize = isDev
  ? new Sequelize(
      process.env.DEV_DB_NAME!,
      process.env.DEV_DB_USER!,
      process.env.DEV_DB_PASSWORD!,
      {
        host: process.env.DEV_DB_HOST,
        port: Number(process.env.DEV_DB_PORT),
        dialect: "postgres",
        dialectModule: require("pg"),
        logging: false,
      }
    )
  : new Sequelize(process.env.PROD_DB_URL!, {
      dialect: "postgres",
      dialectModule: require("pg"),
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });

export default sequelize;

import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./routes/customer.routes";
import sequelize from "./config/database";
import "./models/index.model";
import { seedDatabase } from "./seeders/customer.seeder";
import cors from "cors";
import serverless from "serverless-http";
import alertsRoutes from "./routes/alerts.routes";

dotenv.config();

const app = express();

// Configuração CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/alerts", alertsRoutes);

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco de dados");

    await sequelize.sync({ alter: true });
    console.log("Tabelas sincronizadas");

    await seedDatabase();
    console.log("Dados iniciais inseridos (seed) com sucesso");
  } catch (err) {
    console.error("Erro ao iniciar a aplicação:", err);
  }
}

initDatabase();

// Local: roda com listen
if (process.env.MODE === "development") {
  const port = process.env.SERVER_PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

// Vercel: exporta como handler
export const handler = serverless(app);
export default app;
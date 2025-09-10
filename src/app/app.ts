import express from "express";
import dotenv from "dotenv";
import customerRoutes from "../routes/customer.routes";
import sequelize from "../config/database";
import "../models/index.model";
// import { seedDatabase } from "../seeders/customer.seeder";
import cors from 'cors';
import alertsRoutes from "../routes/alerts.routes";

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

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API viva",
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  try {
    // Testa a conexão com o banco
    await sequelize.authenticate();
    console.log("Conectado ao banco de dados");

    // Sincroniza todos os models (cria/atualiza tabelas)
    await sequelize.sync({ alter: true });
    console.log("Tabelas sincronizadas");

    // Popula dados do JSON se ainda não existirem
    // await seedDatabase();
    // console.log("Dados iniciais inseridos (seed) com sucesso");

    // Inicia o servidor **somente se estiver local**
    // if (process.env.MODE === "development") {
    //   const port = process.env.SERVER_PORT || 3000;
    //   app.listen(port, () => {
    //     console.log(`Servidor rodando na porta ${port}`);
    //   });
    // } else {
    //   console.log("Rodando em serverless, app.listen não é chamado");
    // }
  } catch (err) {
    console.error("Erro ao iniciar a aplicação:", err);
  }
}

startServer();

export default app;

import express from "express";
import dotenv from "dotenv";
import customerRoutes from "../routes/customer.routes";
import "../models/index.model";
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

export default app;

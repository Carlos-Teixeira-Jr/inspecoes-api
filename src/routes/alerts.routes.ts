import { Router } from "express";
import { AlertController } from "../controllers/alert.controller";

const router = Router();
const controller = new AlertController();

router.get("/", (req, res) => controller.getAlerts(req, res));

export default router;

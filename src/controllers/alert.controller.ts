import { Request, Response } from "express";
import { AlertService } from "../services/alert.service";

const alertService = new AlertService();

export class AlertController {
  async getAlerts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await alertService.getAlerts(page, limit);

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar alertas" });
    }
  }
}

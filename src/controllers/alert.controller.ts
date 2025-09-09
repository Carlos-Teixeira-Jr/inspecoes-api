import { Request, Response } from "express";
import { AlertService } from "../services/alert.service";

const alertService = new AlertService();

export class AlertController {

  async getAlerts(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = (req.query.status as string) || null;

    const data = await alertService.getAlerts(page, limit, status);
    res.json(data);
  }
}

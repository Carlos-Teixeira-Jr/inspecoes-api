import { AlertRepository } from "../repositories/alert.repository";

export class AlertService {
  private repository = new AlertRepository();

  async getAlerts(page?: number, limit?: number, status?: string | null) {
    return await this.repository.getAllAlerts({ page, limit, status: status as any });
  }
}
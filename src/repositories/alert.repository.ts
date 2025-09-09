import Activity from "../models/activity.model";
import Area from "../models/area.model";
import Customer from "../models/customer.model";
import Equipment from "../models/equipment.model";

interface GetAlertasParams {
  page?: number;
  limit?: number;
  status?: string;
}

export class AlertRepository {
  async getAllAlerts({ page = 1, limit = 10, status }: GetAlertasParams) {
    const offset = (page - 1) * limit;

    // Filtro de status
    const where: any = {};
    if (status === "pendente") where.status = "pendente";
    if (status === "concluida") where.status = "concluida";
    if (status === "atrasada") where.alerta = "Atraso > 7 dias";

    const { count, rows } = await Activity.findAndCountAll({
      where,
      include: [
        {
          model: Equipment,
          as: "equipment",
          attributes: ["id", "nome", "tipo"],
          include: [
            {
              model: Area,
              as: "area",
              attributes: ["id", "nome", "customerId"],
              include: [
                {
                  model: Customer,
                  as: "customer",
                  attributes: ["id", "nome"],
                },
              ],
            },
          ],
        },
      ],
      limit,
      offset,
      order: [["data_proxima_inspecao", "ASC"]],
    });

    // Transformar para formato mais fácil no front
    const alerts = rows.map((atividade) => {
      const equipamento = atividade.equipment;
      const area = equipamento?.area;
      const cliente = area?.customer;

      return {
        id: atividade.id,
        cliente: cliente?.nome ?? "-", // fallback caso null
        tipo: equipamento?.tipo ?? "-",
        equipamento: equipamento?.nome ?? "-",
        data: atividade.data_proxima_inspecao,
        status: atividade.status,
        alerta: atividade.alerta,
      };
    });

    return { total: count, alerts };
  }
}

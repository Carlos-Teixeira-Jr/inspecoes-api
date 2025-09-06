import Customer from "../models/customer.model";
import Area from "../models/area.model";
import Equipment from "../models/equipment.model";
import Activity from "../models/activity.model";

export class CustomerRepository {
  async createCustomer(customerData: any) {
    const customer = await Customer.create({
      nome: customerData.nome,
      endereco: customerData.endereco,
      latitude: customerData.latitude,
      longitude: customerData.longitude,
    });
    return customer;
  }

  async getAllCustomers(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Customer.findAndCountAll({
      include: [
        {
          model: Area,
          as: "areas",
          include: [
            {
              model: Equipment,
              as: "equipamentos",
              include: [{ model: Activity, as: "atividade" }],
            },
          ],
        },
      ],
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return { total: count, customers: rows };
  }

  async createArea(areaData: any, customerId: number) {
    return await Area.create({
      nome: areaData.nome,
      latitude: areaData.latitude,
      longitude: areaData.longitude,
      customerId,
    });
  }

  async createEquipment(equipData: any, areaId: number) {
    return await Equipment.create({
      nome: equipData.nome,
      tipo: equipData.tipo,
      areaId,
    });
  }

  async createActivity(activityData: any, equipmentId: number) {
    return await Activity.create({
      data: activityData.data,
      descricao: activityData.descricao,
      data_inicio: activityData.data_inicio,
      data_finalizacao: activityData.data_finalizacao,
      status: activityData.status,
      data_proxima_inspecao: activityData.data_proxima_inspecao,
      alerta: activityData.alerta,
      equipmentId,
    });
  }
}

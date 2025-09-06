import { CustomerRepository } from "../repositories/customer.repository";

export class CustomerService {
  private repository = new CustomerRepository();

  async createCustomerHierarchy(customerData: any) {
    const customer = await this.repository.createCustomer(customerData);

    for (const areaData of customerData.areas) {
      const area = await this.repository.createArea(areaData, customer.id);

      for (const equipData of areaData.equipamentos) {
        const equipment = await this.repository.createEquipment(
          equipData,
          area.id
        );
        await this.repository.createActivity(equipData.atividade, equipment.id);
      }
    }

    return customer;
  }

  async getCustomers(page: number = 1, limit: number = 10) {
    return await this.repository.getAllCustomers(page, limit);
  }
}

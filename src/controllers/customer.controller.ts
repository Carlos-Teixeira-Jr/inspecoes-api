import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

const service = new CustomerService();

export class CustomerController {
  async createCustomer(req: Request, res: Response) {
    try {
      const customerData = req.body;
      const customer = await service.createCustomerHierarchy(customerData);
      res.status(201).json(customer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar cliente" });
    }
  }

  async getCustomers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await service.getCustomers(page, limit);

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  }
}

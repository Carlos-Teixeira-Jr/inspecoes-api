import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";

const router = Router();
const controller = new CustomerController();

router.post("/", (req, res) => controller.createCustomer(req, res));
router.get("/", (req, res) => controller.getCustomers(req, res));

export default router;

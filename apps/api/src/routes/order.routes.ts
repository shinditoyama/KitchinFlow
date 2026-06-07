import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { insertCategorySchema } from "@repo/utils/validation/category";
import { OrderController } from "@/controllers/order.controller";
import { authenticate } from "@/middlewares/authenticate";

const router: Router = Router();
const controller = new OrderController();

// router.use(authenticate);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/detail", controller.getById);
router.patch("/:id", controller.sendOrder);
router.delete("/", controller.delete);

router.post("/add", controller.addItem);
router.delete("/remove", controller.removeItem);

export default router;

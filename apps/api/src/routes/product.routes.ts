import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { ProductController } from "@/controllers/product.controller";
import { insertProductSchema } from "@repo/utils/validation/product";
import { authenticate } from "@/middlewares/authenticate";

const router: Router = Router();
const controller = new ProductController();

// router.use(authenticate);

router.post("/", validate(insertProductSchema), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", validate(insertProductSchema), controller.update);
router.patch("/:id/status", controller.toggle);
router.delete("/", controller.delete);

export default router;

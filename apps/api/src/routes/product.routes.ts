import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { ProductController } from "@/controllers/product.controller";
import { productSchema } from "@repo/utils/validation";

const router: Router = Router();

router.post("/", validate(productSchema), new ProductController().create);
router.get("/", new ProductController().getAll);

export default router;

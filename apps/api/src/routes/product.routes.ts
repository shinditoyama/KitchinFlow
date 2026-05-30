import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { ProductController } from "@/controllers/product.controller";
import { insertProductSchema } from "@repo/utils/validation/product";

const router: Router = Router();

router.post("/", validate(insertProductSchema), new ProductController().create);
router.get("/", new ProductController().getAll);
router.get("/:id", new ProductController().getOne);
router.patch(
  "/:id",
  validate(insertProductSchema),
  new ProductController().update,
);
router.patch("/:id/status", new ProductController().toggle);
router.delete("/", new ProductController().remove);

export default router;

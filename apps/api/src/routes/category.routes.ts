import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { CategoryController } from "@/controllers/category.controller";
import { categorySchema } from "@repo/utils/validation";

const router: Router = Router();

router.post("/", validate(categorySchema), new CategoryController().create);
router.get("/", new CategoryController().getAll);
router.get("/:id", new CategoryController().getOne);
router.patch("/:id", validate(categorySchema), new CategoryController().update);
router.delete("/:id", new CategoryController().remove);

export default router;

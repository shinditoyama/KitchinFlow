import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { CategoryController } from "@/controllers/category.controller";
import { insertCategorySchema } from "@repo/utils/validation/category";
import { isAuthenticated } from "@/middlewares/authenticate";
import { isAdmin } from "@/middlewares/admin";

const router: Router = Router();

router.post(
  "/",
  validate(insertCategorySchema),
  isAuthenticated,
  isAdmin,
  new CategoryController().create,
);
router.get("/", new CategoryController().getAll);
router.get("/:id", new CategoryController().getOne);
router.patch(
  "/:id",
  validate(insertCategorySchema),
  new CategoryController().update,
);
router.delete("/:id", new CategoryController().remove);

export default router;

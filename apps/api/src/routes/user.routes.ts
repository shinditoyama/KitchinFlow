import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { UserController } from "@/controllers/user.controller";
import { isAuthenticated } from "@/middlewares/authenticate";
import { insertUserSchema } from "@repo/utils/validation/user";

const router: Router = Router();

router.post("/", validate(insertUserSchema), new UserController().create);
router.get("/", new UserController().getAll);
router.post("/me", isAuthenticated, new UserController().getOne);

export default router;

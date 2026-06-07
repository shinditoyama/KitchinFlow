import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { UserController } from "@/controllers/user.controller";
import { authenticate } from "@/middlewares/authenticate";
import {
  insertAuthSchema,
  insertUserSchema,
} from "@repo/utils/validation/user";

const router: Router = Router();
const controller = new UserController();

// router.use(authenticate);

router.post("/", validate(insertUserSchema), controller.signup);
router.get("/", controller.getAll);
router.post("/me", controller.getById);
router.post("/login", validate(insertAuthSchema), controller.signin);

export default router;

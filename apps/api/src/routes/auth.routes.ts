import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { AuthController } from "@/controllers/auth.controller";
import { insertAuthSchema } from "@repo/utils/validation/user";

const router: Router = Router();

router.post("/login", validate(insertAuthSchema), new AuthController().handle);

export default router;

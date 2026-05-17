import { Router } from "express";
import categoyRoutes from "./category.routes";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";

const router: Router = Router();

router.get("/teste", (req, res) => {
  res.json({ status: "ok" });
});

// Rotas Principais
router.use("/category", categoyRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);

export default router;

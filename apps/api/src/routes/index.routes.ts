import { Router } from "express";
import productRoutes from "./product.routes";
import categoyRoutes from "./category.routes";

const router: Router = Router();

router.get("/teste", (req, res) => {
  res.json({ status: "ok" });
});

// Rotas Principais
router.use("/category", categoyRoutes);
router.use("/product", productRoutes);

export default router;

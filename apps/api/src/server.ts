import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes/index.routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(express.json());
app.use(cors());

// Todas as Rotas
app.use("/api", routes);

// Tratamento de Erro (Deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});

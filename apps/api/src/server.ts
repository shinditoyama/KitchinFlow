import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes/index.routes";
import { errorHandler } from "./middlewares/error-handler";

import { createRouteHandler } from "uploadthing/express";
import { ourFileRouter } from "./config/uploadthing";

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: ourFileRouter,
    config: {
      callbackUrl: "http://localhost:3333/api/uploadthing",
      token: process.env.UPLOADTHING_TOKEN,
    },
  }),
);

// Todas as Rotas
app.use("/api", routes);

// Tratamento de Erro (Deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});

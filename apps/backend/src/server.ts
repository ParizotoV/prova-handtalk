import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { collectController } from "./adapters/inbound/collectController";
import { listController } from "./adapters/inbound/listController";
import { setupSwagger } from "./config/swagger";
import { authMiddleware } from "./middlewares/authMiddleware";
import { rateLimiterMiddleware } from "./middlewares/rateLimiterMiddleware";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// Registrando os middlewares corretamente
app.post(
  "/collect",
  authMiddleware,
  rateLimiterMiddleware,
  async (req, res, next) => {
    await collectController(req, res, next);
  }
);

app.get("/list", async (req, res) => {
  await listController(req, res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`🚀 API rodando em http://localhost:${PORT}`)
);

export { app };


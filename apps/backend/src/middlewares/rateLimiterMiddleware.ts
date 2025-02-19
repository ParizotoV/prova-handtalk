import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible"; // Biblioteca para controle de requisições (rate limiting)

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"; // Define a URL do Redis ou usa o padrão local
const redisClient = new Redis(redisUrl); // Inicializa a conexão com o Redis

// Configura o rate limiter para permitir no máximo 5 requisições a cada 10 minutos por token
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient, // Conecta o rate limiter ao Redis
  points: 5, // Número máximo de requisições permitidas
  duration: 600, // Tempo de restrição em segundos (10 minutos)
});

// Middleware para limitar requisições
export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", ""); // Obtém o token do cabeçalho da requisição

  if (token) {
    rateLimiter
      .consume(token) // Verifica se o token ainda pode fazer requisições
      .then(() => next()) // Se permitido, continua para a próxima etapa
      .catch(
        () => res.status(429).json({ error: "Limite de requisições atingido" }) // Se atingiu o limite, retorna erro 429
      );
  } else {
    res.status(400).json({ error: "Token não fornecido" }); // Retorna erro 400 se o token não for fornecido
  }
};

import { Request, Response } from "express";
import { listService } from "../../application/services/listService";

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Lista as últimas 20 extrações para um token específico
 *     description: Retorna as últimas 20 extrações associadas ao token fornecido no cabeçalho da requisição.
 *     tags:
 *       - Listagem de Dados
 *     security:
 *       - bearerAuth: []  # 🔥 Exige autenticação Bearer
 *     responses:
 *       200:
 *         description: Lista de extrações retornada com sucesso
 *       400:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno ao buscar os dados
 */
export const listController = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({ error: "Token ausente ou inválido." });
    }

    const data = await listService(token);
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar extrações:", error);
  }
};

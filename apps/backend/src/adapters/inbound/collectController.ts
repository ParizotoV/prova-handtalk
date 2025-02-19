import { NextFunction, Request, Response } from "express";
import { collectService } from "../../application/services/collectService";

/**
 * @swagger
 * /collect:
 *   post:
 *     summary: Coleta dados do plugin e os armazena no Firebase
 *     description: Esta rota recebe dados do plugin de extração e os armazena no Firebase.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Coleta de Dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device:
 *                 type: string
 *                 example: "desktop"
 *               os:
 *                 type: string
 *                 example: "Windows"
 *               domain:
 *                 type: string
 *                 example: "example.com"
 *               themeChanges:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Dados coletados com sucesso
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Token inválido ou ausente
 */
export const collectController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await collectService(req);
    res.status(response.status).json(response.body);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { getAuthorizedTokens } from "../adapters/outbound/tokenRepository";
import { asyncHandler } from "./asyncHandler";

let AUTHORIZED_TOKENS: { [key: string]: string } = {};

const loadTokens = async () => {
  AUTHORIZED_TOKENS = await getAuthorizedTokens();
};

setInterval(loadTokens, 5 * 60 * 1000);
loadTokens();

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token || !AUTHORIZED_TOKENS[token]) {
      res
        .status(403)
        .json({ error: "Acesso negado. Token inválido ou ausente." });
      return;
    }

    req.userDomain = AUTHORIZED_TOKENS[token];
    next();
  }
);

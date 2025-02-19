import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Envelopa funções assíncronas para capturar erros automaticamente.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

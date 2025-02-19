import { Request } from "express";
import { saveExtraction } from "../../adapters/outbound/firebaseRepository";

export const collectService = async (req: Request) => {
  const { device, os, domain, themeChanges } = req.body;

  if (!device || !os || !domain) {
    return { status: 400, body: { error: "Dados inválidos" } };
  }

  const token = req.headers.authorization?.replace("Bearer ", "");
  const newEntry = {
    timestamp: Date.now(),
    token,
    domain,
    device,
    os,
    themeChanges: themeChanges || 0,
  };

  return await saveExtraction(newEntry);
};

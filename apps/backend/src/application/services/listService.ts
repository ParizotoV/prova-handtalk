import { getExtractions } from "../../adapters/outbound/firebaseRepository";

export const listService = async (token: string) => {
  return await getExtractions(token);
};

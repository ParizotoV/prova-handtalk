import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { MockedFunction } from "jest-mock";
import { getExtractions } from "../adapters/outbound/firebaseRepository";
import { listService } from "../application/services/listService"; // ajuste o caminho conforme sua estrutura

// Faz o mock do getExtractions para controlar sua resposta nos testes
jest.mock("../adapters/outbound/firebaseRepository", () => ({
  getExtractions: jest.fn(),
}));

describe("listService", () => {
  // Usa a tipagem do jest para o mock (aqui, usamos o casting para any)
  const mockedGetExtractions = getExtractions as MockedFunction<typeof getExtractions>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar getExtractions com o token informado e retornar o resultado", async () => {
    const fakeExtractions = [{ id: 1 }, { id: 2 }];
    mockedGetExtractions.mockResolvedValue(fakeExtractions);

    const result = await listService("TOKEN_12345");

    expect(mockedGetExtractions).toHaveBeenCalledWith("TOKEN_12345");
    expect(result).toEqual(fakeExtractions);
  });
});

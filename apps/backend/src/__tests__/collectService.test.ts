/// <reference types="jest" />
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { collectService } from "../application/services/collectService";

import { Request } from "express";
import type { MockedFunction } from "jest-mock";
import { saveExtraction } from "../adapters/outbound/firebaseRepository";

// Faz o mock da função saveExtraction
jest.mock("../adapters/outbound/firebaseRepository", () => ({
  saveExtraction: jest.fn(),
}));

describe("collectService", () => {
  // Definindo o mock tipado para saveExtraction
  const mockSaveExtraction = saveExtraction as MockedFunction<
    typeof saveExtraction
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar erro 400 se device, os ou domain estiverem ausentes", async () => {
    // Simula uma requisição sem o campo domain
    const req = {
      body: { device: "iPhone", os: "iOS" },
      headers: {},
    } as unknown as Request;

    const result = await collectService(req);

    expect(result).toEqual({ status: 400, body: { error: "Dados inválidos" } });
    expect(mockSaveExtraction).not.toHaveBeenCalled();
  });

  it("deve chamar saveExtraction com os dados corretos quando todos os campos obrigatórios são fornecidos", async () => {
    // Simula uma requisição com todos os campos obrigatórios e o campo themeChanges
    const req = {
      body: {
        device: "Samsung",
        os: "Android",
        domain: "example.com",
        themeChanges: 2,
      },
      headers: { authorization: "Bearer mytoken123" },
    } as unknown as Request;

    // Simula a resposta da função saveExtraction
    const fakeResponse = { status: 200, body: { success: true, error: "" } };
    mockSaveExtraction.mockResolvedValue(fakeResponse);

    const result = await collectService(req);

    // Verifica se saveExtraction foi chamada
    expect(mockSaveExtraction).toHaveBeenCalledTimes(1);

    // Recupera o argumento enviado para saveExtraction e verifica suas propriedades
    const callArg = mockSaveExtraction.mock.calls[0][0];
    expect(callArg).toHaveProperty("timestamp");
    expect(callArg).toHaveProperty("token", "mytoken123");
    expect(callArg).toHaveProperty("domain", "example.com");
    expect(callArg).toHaveProperty("device", "Samsung");
    expect(callArg).toHaveProperty("os", "Android");
    expect(callArg).toHaveProperty("themeChanges", 2);

    // Verifica se o resultado é o fakeResponse definido
    expect(result).toEqual(fakeResponse);
  });

  it("deve definir themeChanges como 0 caso não seja fornecido", async () => {
    // Simula uma requisição sem o campo themeChanges
    const req = {
      body: { device: "Samsung", os: "Android", domain: "example.com" },
      headers: { authorization: "Bearer mytoken123" },
    } as unknown as Request;

    const fakeResponse = { status: 200, body: { success: true, error: "" } };
    mockSaveExtraction.mockResolvedValue(fakeResponse);

    const result = await collectService(req);

    expect(mockSaveExtraction).toHaveBeenCalledTimes(1);
    const callArg = mockSaveExtraction.mock.calls[0][0];
    expect(callArg).toHaveProperty("themeChanges", 0);
    expect(result).toEqual(fakeResponse);
  });

  it("deve extrair corretamente o token do header mesmo sem o prefixo 'Bearer '", async () => {
    // Simula uma requisição em que o header de autorização não possui o prefixo "Bearer "
    const req = {
      body: {
        device: "Samsung",
        os: "Android",
        domain: "example.com",
        themeChanges: 1,
      },
      headers: { authorization: "mytoken123" },
    } as unknown as Request;

    const fakeResponse = { status: 200, body: { success: true, error: "" } };
    mockSaveExtraction.mockResolvedValue(fakeResponse);

    const result = await collectService(req);

    expect(mockSaveExtraction).toHaveBeenCalledTimes(1);
    const callArg = mockSaveExtraction.mock.calls[0][0];
    // Na implementação, a substituição só ocorrerá se houver o prefixo "Bearer "
    expect(callArg).toHaveProperty("token", "mytoken123");
    expect(result).toEqual(fakeResponse);
  });
});

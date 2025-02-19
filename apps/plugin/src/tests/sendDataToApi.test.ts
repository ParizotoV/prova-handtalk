import { sendDataToApi } from "../adapters/outbound/apiService";

global.fetch = jest.fn();

describe("sendDataToApi Function", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Deve enviar dados corretamente e retornar sucesso", async () => {
    const mockResponse = { message: "Dados coletados com sucesso!" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    localStorage.setItem("tkn", "TEST_TOKEN");

    const data = { device: "desktop", os: "Windows", themeChanges: 3 };
    const result = await sendDataToApi(data);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer TEST_TOKEN",
      },
      body: JSON.stringify(data),
    });

    expect(localStorage.getItem("theme_changes")).toBe("0");
    expect(result).toEqual({ success: true, data: mockResponse });
  });

  it("Deve retornar erro quando a API responde com status de erro", async () => {
    const mockErrorResponse = { error: "Erro ao processar requisição" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse),
    });

    localStorage.setItem("tkn", "TEST_TOKEN");

    const data = { device: "desktop", os: "Windows", themeChanges: 3 };
    const result = await sendDataToApi(data);

    expect(result.success).toBe(false);
    expect((result.error as { message: string }).message).toBe("Erro ao processar requisição");
  });

  it("Deve retornar erro quando não há token no localStorage", async () => {
    const data = { device: "desktop", os: "Windows", themeChanges: 3 };
    const result = await sendDataToApi(data);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: JSON.stringify(data),
    });

    expect(result.success).toBe(false);
  });

  it("Deve capturar exceções e retornar erro corretamente", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Erro de rede"));

    localStorage.setItem("tkn", "TEST_TOKEN");

    const data = { device: "desktop", os: "Windows", themeChanges: 3 };
    const result = await sendDataToApi(data);

    expect(result.success).toBe(false);
    expect((result.error as { message: string }).message).toBe("Erro de rede");
  });

  it("Deve garantir que 'theme_changes' seja resetado apenas após sucesso", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "Erro ao processar requisição" }),
    });

    localStorage.setItem("tkn", "TEST_TOKEN");
    localStorage.setItem("theme_changes", "5");

    const data = { device: "desktop", os: "Windows", themeChanges: 3 };
    await sendDataToApi(data);

    expect(localStorage.getItem("theme_changes")).toBe("5"); // Não foi resetado devido ao erro
  });
});

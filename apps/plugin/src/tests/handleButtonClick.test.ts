import { handleButtonClick } from "../adapters/inbound/buttonController";
import { sendDataToApi } from "../adapters/outbound/apiService";
import { showMessage } from "../adapters/ui/domUtils";
import { collectData } from "../application/dataCollector";
import { resetThemeChanges } from "../infrastructure/themeRepository";

jest.mock("../application/dataCollector");
jest.mock("../infrastructure/themeRepository");
jest.mock("../adapters/outbound/apiService");
jest.mock("../adapters/ui/domUtils");

describe("handleButtonClick", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve extrair dados e enviá-los para a API corretamente", async () => {
    const mockData = { device: "desktop", os: "Windows", themeChanges: "3" };
    (collectData as jest.Mock).mockReturnValue(mockData);
    (sendDataToApi as jest.Mock).mockResolvedValue({ success: true });

    await handleButtonClick();

    expect(collectData).toHaveBeenCalled();
    expect(sendDataToApi).toHaveBeenCalledWith(mockData);
  });

  it("Deve exibir mensagem de sucesso ao enviar dados corretamente", async () => {
    (collectData as jest.Mock).mockReturnValue({});
    (sendDataToApi as jest.Mock).mockResolvedValue({ success: true });

    await handleButtonClick();

    expect(showMessage).toHaveBeenCalledWith(
      "✅ Dados enviados com sucesso!",
      "success"
    );
  });

  it("Deve resetar mudanças de tema após envio bem-sucedido", async () => {
    (collectData as jest.Mock).mockReturnValue({});
    (sendDataToApi as jest.Mock).mockResolvedValue({ success: true });

    await handleButtonClick();

    expect(resetThemeChanges).toHaveBeenCalled();
  });

  it("Deve disparar um evento global após envio bem-sucedido", async () => {
    (collectData as jest.Mock).mockReturnValue({});
    (sendDataToApi as jest.Mock).mockResolvedValue({ success: true });

    const eventListener = jest.fn();
    window.addEventListener("themeChangesReset", eventListener);

    await handleButtonClick();

    expect(eventListener).toHaveBeenCalled();
  });

  it("Deve exibir mensagem de erro se a API falhar", async () => {
    (collectData as jest.Mock).mockReturnValue({});
    (sendDataToApi as jest.Mock).mockResolvedValue({
      success: false,
      error: { message: "Erro ao processar requisição" },
    });

    await handleButtonClick();

    expect(showMessage).toHaveBeenCalledWith(
      "❌ Erro ao processar requisição",
      "error"
    );
  });
});

import { collectData } from "../../application/dataCollector";
import { resetThemeChanges } from "../../infrastructure/themeRepository";
import { sendDataToApi } from "../outbound/apiService";
import { showMessage } from "../ui/domUtils";

export const handleButtonClick = async () => {
  console.log("📥 Iniciando extração de dados...");

  // Extrai os dados do navegador
  const extractedData = collectData();

  // Envia os dados para a API
  const response = await sendDataToApi(extractedData);

  if (response.success) {
    showMessage("✅ Dados enviados com sucesso!", "success");

    // 🔥 Zera o contador de mudanças de tema no `localStorage`
    resetThemeChanges();

    // 🔥 Dispara um evento para que o React atualize a UI
    window.dispatchEvent(new Event("themeChangesReset"));
  } else {
    showMessage(
      `❌ ${(response?.error as { message: string })?.message}`,
      "error"
    );
  }
};

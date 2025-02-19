import { createButton } from "../ui/domUtils";
import { handleButtonClick } from "./buttonController";

export const initPlugin = () => {
  console.log("✅ Plugin carregado!");

  if (document.getElementById("plugin-button")) {
    console.log("⚠️ O botão do plugin já foi adicionado. Evitando duplicação.");
    return;
  }

  const button = createButton("Extrair Dados");
  button.id = "plugin-button"; // Garante que só um botão será criado
  button.addEventListener("click", handleButtonClick);
  document.body.appendChild(button);
};

if (typeof window !== "undefined") {
  console.log("🌍 Plugin rodando no navegador!");
  window.addEventListener("load", initPlugin);
}

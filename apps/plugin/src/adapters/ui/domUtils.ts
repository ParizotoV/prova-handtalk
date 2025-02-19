export const createButton = (text: string): HTMLButtonElement => {
  const button = document.createElement("button");
  button.innerText = text;
  button.id = "plugin-button"; // Adiciona um ID para referência futura

  // Aplicando estilo moderno ao botão
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.padding = "12px 24px";
  button.style.backgroundColor = "#007bff";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "8px";
  button.style.cursor = "pointer";
  button.style.zIndex = "9999";
  button.style.fontSize = "16px";
  button.style.fontWeight = "bold";
  button.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
  button.style.transition = "all 0.3s ease";

  // Efeito hover
  button.onmouseover = () => {
    button.style.backgroundColor = "#0056b3";
    button.style.transform = "scale(1.05)";
  };

  button.onmouseleave = () => {
    button.style.backgroundColor = "#007bff";
    button.style.transform = "scale(1)";
  };

  // Efeito de clique
  button.onmousedown = () => {
    button.style.transform = "scale(0.95)";
  };

  button.onmouseup = () => {
    button.style.transform = "scale(1.05)";
  };

  document.body.appendChild(button);
  return button;
};

const messages: HTMLDivElement[] = [];

export const showMessage = (message: string, type: "success" | "error") => {
  const messageDiv = document.createElement("div");
  messageDiv.innerText = message;
  messageDiv.style.position = "fixed";
  messageDiv.style.right = "20px";
  messageDiv.style.padding = "10px 15px";
  messageDiv.style.backgroundColor = type === "success" ? "green" : "red";
  messageDiv.style.color = "#fff";
  messageDiv.style.borderRadius = "5px";
  messageDiv.style.fontSize = "14px";
  messageDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  messageDiv.style.zIndex = "9999";
  messageDiv.style.opacity = "0";
  messageDiv.style.transition = "opacity 0.3s, transform 0.3s";

  // Define a altura mínima acima do botão
  const button = document.getElementById("plugin-button");
  const baseBottom = button ? button.offsetHeight + 40 : 80; // Garante um espaçamento mínimo

  // Define a posição baseada no número de mensagens ativas
  const offset = messages.length * 50 + baseBottom;
  messageDiv.style.bottom = `${offset}px`;

  document.body.appendChild(messageDiv);

  // Adiciona a mensagem à lista
  messages.push(messageDiv);

  // Faz a mensagem aparecer suavemente
  setTimeout(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateY(0)";
  }, 10);

  // Remove a mensagem após 3s
  setTimeout(() => {
    messageDiv.style.opacity = "0";
    messageDiv.style.transform = "translateY(-10px)";

    setTimeout(() => {
      document.body.removeChild(messageDiv);
      messages.shift(); // Remove a primeira mensagem do array
      updateMessagePositions(); // Atualiza posições após remoção
    }, 300);
  }, 3000);
};

// Atualiza as posições das mensagens restantes para manter a ordem correta
const updateMessagePositions = () => {
  const button = document.getElementById("plugin-button");
  const baseBottom = button ? button.offsetHeight + 40 : 80; // Espaço mínimo acima do botão

  messages.forEach((msg, index) => {
    msg.style.bottom = `${index * 50 + baseBottom}px`;
  });
};

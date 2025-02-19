// src/__tests__/ThemeToggle.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import ThemeToggle from "../adapters/inbound/components/ThemeToggle";

describe("ThemeToggle Component", () => {
  it("deve alternar entre os temas claro e escuro", () => {
    render(<ThemeToggle />);

    // Obtém o botão de alternância de tema
    const toggleButton = screen.getByRole("button");

    // Simula clique para ativar o tema escuro
    fireEvent.click(toggleButton);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    // Simula clique para voltar ao tema claro
    fireEvent.click(toggleButton);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});

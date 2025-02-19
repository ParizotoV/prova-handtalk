// src/__tests__/Accessibility.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../adapters/inbound/pages/Home";

describe("Acessibilidade - Ajuste de Fonte", () => {
  it("deve aumentar e diminuir o tamanho da fonte", () => {
    render(<Home />);

    const increaseButton = screen.getByLabelText("Aumentar fonte");
    const decreaseButton = screen.getByLabelText("Diminuir fonte");
    const homeContainer = screen.getByRole("main");

    // Verifica tamanho inicial da fonte
    expect(homeContainer).toHaveStyle("font-size: 1em");

    // Simula clique para aumentar a fonte
    fireEvent.click(increaseButton);
    expect(homeContainer).toHaveStyle("font-size: 1.1em");

    // Simula clique para diminuir a fonte
    fireEvent.click(decreaseButton);
    expect(homeContainer).toHaveStyle("font-size: 1em");
  });
});

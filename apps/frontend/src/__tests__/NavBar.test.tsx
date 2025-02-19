import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "../adapters/inbound/components/NavBar";

jest.mock("../adapters/inbound/components/ThemeToggle", () => () => (
  <div data-testid="theme-toggle">ThemeToggle</div>
));

describe("NavBar Component", () => {
  it("Deve renderizar corretamente a logo", () => {
    render(<NavBar />);

    const logo = screen.getByText("Prova Hand Talk");
    expect(logo).toBeInTheDocument();
  });

  it("Deve renderizar os itens do menu", () => {
    render(<NavBar />);

    const homeLink = screen.getByRole("link", { name: /Início/i });
    expect(homeLink).toBeInTheDocument();

    const themeToggle = screen.getByTestId("theme-toggle");
    expect(themeToggle).toBeInTheDocument();
  });

  it("Deve abrir e fechar o menu mobile ao clicar no botão de menu", () => {
    render(<NavBar />);

    const menuButton = screen.getByRole("button", { name: /☰/i });
    expect(menuButton).toBeInTheDocument();

    // Antes de clicar, o menu não tem a classe "open"
    const navLinks = screen.getByRole("list");
    expect(navLinks).not.toHaveClass("open");

    // Clica no botão para abrir o menu
    fireEvent.click(menuButton);
    expect(navLinks).toHaveClass("open");

    // Clica novamente para fechar o menu
    fireEvent.click(menuButton);
    expect(navLinks).not.toHaveClass("open");
  });
});

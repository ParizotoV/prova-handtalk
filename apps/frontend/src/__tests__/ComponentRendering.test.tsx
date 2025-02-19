import { render, screen } from "@testing-library/react";
import Footer from "../adapters/inbound/components/Footer";
import NavBar from "../adapters/inbound/components/NavBar";
import Home from "../adapters/inbound/pages/Home";

describe("Renderização dos Componentes", () => {
  it("deve renderizar a página Home corretamente", () => {
    render(<Home />);
    expect(screen.getByText(/Sobre Mim/i)).toBeInTheDocument();
    expect(screen.getByText(/Depoimentos/i)).toBeInTheDocument();
    expect(screen.getByText(/Últimas Postagens/i)).toBeInTheDocument();
  });

  it("deve renderizar o NavBar corretamente", () => {
    render(<NavBar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("deve renderizar o Footer corretamente", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

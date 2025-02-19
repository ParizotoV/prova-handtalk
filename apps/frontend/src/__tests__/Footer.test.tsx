import { render, screen } from "@testing-library/react";
import Footer from "../adapters/inbound/components/Footer";

describe("Footer Component", () => {
  it("Deve renderizar corretamente o texto de direitos autorais", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `© ${currentYear} Todos os direitos reservados.`
    );

    expect(copyrightText).toBeInTheDocument();
  });

  it("Deve conter a seção de contato com o email correto", () => {
    render(<Footer />);

    const contactSection = screen.getByText(/Contato/i);
    expect(contactSection).toBeInTheDocument();

    const email = screen.getByText("Email: parizotov@gmail.com");
    expect(email).toBeInTheDocument();
  });

  it("Deve renderizar os links das redes sociais corretamente", () => {
    render(<Footer />);

    const linkedinLink = screen.getByLabelText("LinkedIn");
    const githubLink = screen.getByLabelText("GitHub");
    const emailLink = screen.getByLabelText("Email");

    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/viniciusvparizoto/"
    );
    expect(githubLink).toHaveAttribute("href", "https://github.com/ParizotoV");
    expect(emailLink).toHaveAttribute("href", "mailto:parizotov@gmail.com");
  });

  it("Deve conter a seção de redes sociais", () => {
    render(<Footer />);

    const socialSection = screen.getByText(/Redes Sociais/i);
    expect(socialSection).toBeInTheDocument();
  });
});

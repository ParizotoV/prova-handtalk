import { render, screen } from "@testing-library/react";
import Avatar from "../adapters/inbound/components/Avatar";

describe("Avatar Component", () => {
  it("Deve renderizar corretamente com a imagem fornecida", () => {
    render(<Avatar src="/images/test-avatar.jpg" alt="Avatar Teste" />);

    const avatarImage = screen.getByAltText("Avatar Teste");

    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute("src", "/images/test-avatar.jpg");
  });

  it("Deve aplicar a classe correta com base no tamanho fornecido", () => {
    const { container } = render(
      <Avatar src="/images/test.jpg" size="large" />
    );

    const avatarContainer = container.querySelector(".avatar-container");
    const avatarImage = container.querySelector(".avatar");

    expect(avatarContainer).toHaveClass("large");
    expect(avatarImage).toHaveClass("large");
  });

  it("Deve aplicar uma borda personalizada quando a prop `borderColor` for fornecida", () => {
    const { container } = render(
      <Avatar src="/images/test.jpg" borderColor="red" />
    );

    const avatarContainer = container.querySelector(".avatar-container");

    expect(avatarContainer).toHaveStyle("borderColor: red");
  });

  it("Deve definir o alt padrão como 'Avatar' caso não seja fornecido", () => {
    render(<Avatar src="/images/default.jpg" />);

    const avatarImage = screen.getByRole("img");

    expect(avatarImage).toHaveAttribute("alt", "Avatar");
  });

  it("Deve renderizar corretamente quando nenhum tamanho é especificado (usar 'medium' por padrão)", () => {
    const { container } = render(<Avatar src="/images/default.jpg" />);

    const avatarContainer = container.querySelector(".avatar-container");

    expect(avatarContainer).toHaveClass("medium"); // Medium é o padrão
  });
});

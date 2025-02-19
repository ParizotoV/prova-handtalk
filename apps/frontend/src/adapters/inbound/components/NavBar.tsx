import React, { useState } from "react";
import "./../../../styles/navbar.css";
import ThemeToggle from "./ThemeToggle";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">Prova Hand Talk</div>

        {/* Botão de Menu Sanduíche (Mobile) */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Itens do Menu */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <a href="/">Início</a>
          </li>
          <li>
            <ThemeToggle />
          </li>{" "}
          {/* Botão de Dark Mode */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

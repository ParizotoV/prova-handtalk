import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { getTheme, toggleTheme } from "../../../application/themeService";
import "../../../styles/theme-toggle.css";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    const { newTheme } = toggleTheme();
    setTheme(newTheme);
  };

  return (
    <button onClick={handleThemeChange} className={`theme-toggle ${theme}`}>
      {theme === "dark" ? (
        <FaSun className="theme-icon" />
      ) : (
        <FaMoon className="theme-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;

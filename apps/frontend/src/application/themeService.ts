import {
  getThemeChangesFromStorage,
  getThemeFromStorage,
  setThemeChangesInStorage,
  setThemeInStorage
} from "../infrastructure/themeRepository";

export const getTheme = () => getThemeFromStorage();

export const toggleTheme = () => {
  const currentTheme = getThemeFromStorage();
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Salva o novo tema no armazenamento
  setThemeInStorage(newTheme);

  // Atualiza a contagem de mudanças de tema
  const themeChanges = getThemeChangesFromStorage() + 1;
  setThemeChangesInStorage(themeChanges);

  return { newTheme, themeChanges };
};

export const listenForThemeReset = (callback: () => void) => {
  window.addEventListener("themeChangesReset", callback);
};

export const getThemeFromStorage = (): string => {
  return localStorage.getItem("theme") || "light";
};

export const setThemeInStorage = (theme: string) => {
  localStorage.setItem("theme", theme);
};

export const getThemeChangesFromStorage = (): number => {
  return Number(localStorage.getItem("theme_changes")) || 0;
};

export const setThemeChangesInStorage = (changes: number) => {
  localStorage.setItem("theme_changes", changes.toString());
};

export const trackThemeChanges = () => {
  let changes = 0;

  const observer = new MutationObserver(() => {
    changes += 1;
    localStorage.setItem("themeChanges", changes.toString());
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
};

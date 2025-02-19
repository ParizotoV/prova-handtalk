export const collectData = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  let deviceType: string;

  if (/android/i.test(userAgent)) {
    deviceType = "android";
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    deviceType = "ios";
  } else {
    deviceType = "desktop";
  }

  const os = /windows/i.test(userAgent)
    ? "Windows"
    : /mac/i.test(userAgent)
    ? "MacOS"
    : /linux/i.test(userAgent)
    ? "Linux"
    : "Desconhecido";

  const domain = window.location.hostname;

  return {
    device: deviceType,
    os,
    domain,
    themeChanges: localStorage.getItem("theme_changes") || "0",
  };
};

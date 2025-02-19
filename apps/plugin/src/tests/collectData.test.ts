import { collectData } from "../application/dataCollector";

describe("collectData Function", () => {
  beforeEach(() => {
    Object.defineProperty(window, "navigator", {
      value: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      writable: true,
    });

    Object.defineProperty(window, "location", {
      value: { hostname: "example.com" },
      writable: true,
    });

    localStorage.setItem("theme_changes", "3");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Deve identificar um dispositivo Windows Desktop corretamente", () => {
    const result = collectData();

    expect(result.device).toBe("desktop");
    expect(result.os).toBe("Windows");
    expect(result.domain).toBe("example.com");
    expect(result.themeChanges).toBe("3");
  });

  it("Deve identificar um dispositivo Android corretamente", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (Linux; Android 10)",
      configurable: true,
    });

    const result = collectData();

    expect(result.device).toBe("android");
    expect(result.os).toBe("Linux");
  });

  it("Deve identificar um dispositivo iOS corretamente", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
      configurable: true,
    });

    const result = collectData();

    expect(result.device).toBe("ios");
    expect(result.os).toBe("MacOS");
  });

  it("Deve retornar 'Desconhecido' para um sistema operacional não identificado", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (Unknown OS)",
      configurable: true,
    });

    const result = collectData();

    expect(result.os).toBe("Desconhecido");
  });

  it("Deve retornar '0' caso theme_changes não esteja no localStorage", () => {
    localStorage.removeItem("theme_changes");

    const result = collectData();

    expect(result.themeChanges).toBe("0");
  });
});

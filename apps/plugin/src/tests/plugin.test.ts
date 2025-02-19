import { collectData } from "../application/dataCollector";

describe("collectData", () => {
  it("Deve retornar os dados corretamente", () => {
    global.window = Object.create(window);
    Object.defineProperty(window, "navigator", {
      value: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    Object.defineProperty(window, "location", {
      value: { hostname: "example.com" },
    });

    const data = collectData();
    expect(data.device).toBe("desktop");
    expect(data.os).toBe("Windows");
    expect(data.domain).toBe("example.com");
  });
});

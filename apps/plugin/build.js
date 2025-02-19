const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/adapters/inbound/pluginLoader.ts"],
  bundle: true,
  outfile: "dist/plugin.js",
  platform: "browser",
  format: "esm",
  sourcemap: true
}).catch(() => process.exit(1));

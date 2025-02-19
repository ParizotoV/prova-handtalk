module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current" // Garante que o Babel transpile o código para a versão atual do Node.js
        }
      }
    ]
  ]
};

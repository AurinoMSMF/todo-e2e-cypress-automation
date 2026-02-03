const { defineConfig } = require("cypress");

module.exports = defineConfig({
  testeAtributo: "testando",
  e2e: {
    baseUrl: `https://react-to-do-five-rho.vercel.app/`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

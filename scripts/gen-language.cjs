const {
  generateLangFromGridSheet,
} = require("@megabeedev/js-locale-sheet-loader");

generateLangFromGridSheet({
  defaultLang: "en",
  sheetId: "0",
  ssid: "1UY7dYDSzMfonEbQsp6TXNn8_rEiKenQS_zdSTRmVGXY",
  outputDir: "src/locales/langs",
});

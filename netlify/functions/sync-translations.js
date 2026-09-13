const { generateLangFromGridSheet } = require("@megabeedev/js-locale-sheet-loader");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    // Chạy script để generate language files
    await generateLangFromGridSheet({
      defaultLang: "en",
      sheetId: "0",
      ssid: "1UY7dYDSzMfonEbQsp6TXNn8_rEiKenQS_zdSTRmVGXY",
      outputDir: path.join(process.cwd(), "src/locales/langs"),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Translations synced successfully!",
      }),
    };
  } catch (error) {
    console.error("Error syncing translations:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
};

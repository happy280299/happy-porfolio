const https = require("https");

// Fetch Google Sheet data as CSV
async function fetchGoogleSheet() {
  const spreadsheetId = "1UY7dYDSzMfonEbQsp6TXNn8_rEiKenQS_zdSTRmVGXY";
  const sheetId = "0";
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${sheetId}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

// Parse CSV to nested objects
function parseCSV(csv) {
  const lines = csv.split("\n").filter((line) => line.trim());
  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().toLowerCase());
  const enIndex = headers.indexOf("en");
  const viIndex = headers.indexOf("vi");
  const codeIndex = headers.indexOf("code");

  const en = {};
  const vi = {};

  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i]
      .split(",")
      .map((c) => c.trim().replace(/^"|"$/g, ""));
    const code = cells[codeIndex];
    const enValue = cells[enIndex];
    const viValue = cells[viIndex];

    if (code && enValue) {
      setNestedProperty(en, code, enValue);
    }
    if (code && viValue) {
      setNestedProperty(vi, code, viValue);
    }
  }

  return { en, vi };
}

function setNestedProperty(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

exports.handler = async (event, context) => {
  try {
    const csv = await fetchGoogleSheet();
    const { en, vi } = parseCSV(csv);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Translations synced successfully!",
        data: { en, vi },
      }),
    };
  } catch (error) {
    console.error("Error syncing translations:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

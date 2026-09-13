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

// Parse CSV to nested objects - handle quoted fields
function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) {
    throw new Error("CSV is empty or has no data rows");
  }

  // Parse header
  const headers = parseCSVLine(lines[0]);
  const codeIndex = headers.findIndex((h) => h.toLowerCase() === "code");
  const enIndex = headers.findIndex((h) => h.toLowerCase() === "en");
  const viIndex = headers.findIndex((h) => h.toLowerCase() === "vi");

  if (codeIndex === -1 || enIndex === -1 || viIndex === -1) {
    throw new Error(
      `Missing columns. Found: ${headers.join(", ")}`
    );
  }

  const en = {};
  const vi = {};

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCSVLine(lines[i]);
    if (cells.length === 0 || !cells[codeIndex]) continue;

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

// Parse single CSV line handling quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ""));
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ""));

  return result;
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

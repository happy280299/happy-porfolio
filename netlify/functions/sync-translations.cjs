// Netlify Function - calls proxy server to fetch translations

exports.handler = async (event, context) => {
  try {
    // Replace with your Railway proxy server URL
    const PROXY_URL = process.env.PROXY_SERVER_URL || "https://translation-proxy-server.railway.app";

    const response = await fetch(`${PROXY_URL}/sync-translations`, {
      method: "POST",
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: data.message || "Translations synced successfully!",
          data: data.data,
        }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          success: false,
          message: data.message || "Failed to sync translations",
        }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

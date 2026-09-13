import { useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContextProviderWrapper } from "../Context";

export default function DemoPage() {
  const { lng, setLng } = useContext(ContextProviderWrapper)!;
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [syncMessage, setSyncMessage] = useState("");

  const handleSelectLanguage = (value: string) => {
    setLng(value);
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
    localStorage.setItem("i18nextLng", value);
    setShowLanguagePopup(false);
  };

  const handleSyncTranslations = async () => {
    setSyncStatus("loading");
    setSyncMessage("");

    try {
      const response = await fetch("/.netlify/functions/sync-translations", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSyncStatus("success");
        setSyncMessage(data.message || "Translations synced successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setSyncStatus("error");
        setSyncMessage(data.message || "Failed to sync translations");
      }
    } catch (error) {
      setSyncStatus("error");
      setSyncMessage(
        error instanceof Error ? error.message : "Error syncing translations",
      );
    }
  };

  const listLangguage = [
    {
      name: "🇻🇳 Việt Nam",
      value: "vi",
    },
    {
      name: "🇬🇧 English",
      value: "en",
      active: true,
    },
  ];

  // Flatten nested objects to get all keys
  const flattenObject = (obj: Record<string, any>, prefix = "") => {
    const result: Record<string, string> = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    });
    return result;
  };

  return (
    <div className="min-h-screen bg-[white] flex flex-col items-center justify-center px-6 relative">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-gray-700 font-medium uppercase tracking-wider text-sm hover:opacity-70 transition-opacity"
      >
        ← Back
      </button>

      {/* Language button */}
      <button
        onClick={() => setShowLanguagePopup(true)}
        className="absolute top-6 right-6 text-2xl hover:opacity-70 transition-opacity"
        title="Change language"
      >
        🌐
      </button>

      {/* Language Popup */}
      {showLanguagePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Select Language
            </h2>

            <div className="space-y-4">
              {listLangguage.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelectLanguage(item.value)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
                    lng === item.value
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <p className="text-gray-600 text-sm text-center mt-6">
              {lng === "en"
                ? "Choose your preferred language"
                : "Chọn ngôn ngữ ưu thích của bạn"}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            {lng === "en" ? "Translations" : "Bản dịch"}
          </h1>
          <button
            onClick={handleSyncTranslations}
            disabled={syncStatus === "loading"}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all whitespace-nowrap ml-4 ${
              syncStatus === "loading"
                ? "bg-gray-400 cursor-not-allowed"
                : syncStatus === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : syncStatus === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {syncStatus === "loading"
              ? lng === "en"
                ? "Syncing..."
                : "Đang đồng bộ..."
              : lng === "en"
                ? "Sync"
                : "Đồng bộ"}
          </button>
        </div>

        {syncMessage && (
          <p
            className={`mb-6 p-4 rounded-lg font-medium ${
              syncStatus === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {syncMessage}
          </p>
        )}
      </div>

      {/* Blog Post Demo */}
      <div className="w-full max-w-2xl mx-auto mb-16">
        <article className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <Trans>transalte.title</Trans>
          </h1>
          <p className="text-xl text-indigo-600 font-semibold mb-6">
            <Trans>transalte.subtitle</Trans>
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            <Trans>transalte.intro</Trans>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              <Trans>transalte.section1Title</Trans>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <Trans>transalte.section1Content</Trans>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              <Trans>transalte.section2Title</Trans>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <Trans>transalte.section2Content</Trans>
            </p>
          </section>

          <p className="text-gray-700 leading-relaxed italic border-l-4 border-indigo-600 pl-4">
            <Trans>transalte.conclusion</Trans>
          </p>
        </article>
      </div>

      {/* Main Content */}
    </div>
  );
}

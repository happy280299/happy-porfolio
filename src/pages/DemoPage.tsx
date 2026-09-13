import { useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContextProviderWrapper } from "../Context";

export default function DemoPage() {
  const { lng, setLng } = useContext(ContextProviderWrapper)!;
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  const handleSelectLanguage = (value: string) => {
    setLng(value);
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
    localStorage.setItem("i18nextLng", value);
    setShowLanguagePopup(false);
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
              {/* <button
                onClick={() => handleLanguageSelect("en")}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
                  i18n.language === "en"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                🇬🇧 English
              </button>

              <button
                onClick={() => handleLanguageSelect("vi")}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
                  i18n.language === "vi"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                🇻🇳 Tiếng Việt
              </button> */}
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

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          {lng === "en" ? "Demo Page" : "Trang Demo"}
        </h1>
        <p className="text-xl text-gray-600">
          {lng === "en"
            ? "Welcome to the demo page!"
            : "Chào mừng đến trang demo!"}
        </p>
        <Trans>key.title</Trans>
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContextProviderWrapper } from "../Context";

export default function DemoPage() {
  const { lng, setLng } = useContext(ContextProviderWrapper)!;
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [activeTab, setActiveTab] = useState<"demo" | "guide">("guide");

  const handleSelectLanguage = (value: string) => {
    setLng(value);
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
    localStorage.setItem("i18nextLng", value);
    setShowLanguagePopup(false);
  };

  const listLanguage = [
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
    <div className="min-h-screen bg-[#0C0C0C] flex flex-col px-6 py-12 relative">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-gray-300 font-medium uppercase tracking-wider text-sm hover:text-white transition-colors"
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Language
            </h2>

            <div className="space-y-4">
              {listLanguage.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelectLanguage(item.value)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
                    lng === item.value
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <p className="text-gray-400 text-sm text-center mt-6">
              {lng === "en"
                ? "Choose your preferred language"
                : "Chọn ngôn ngữ ưu thích của bạn"}
            </p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-12 max-w-4xl mx-auto w-full">
        <button
          onClick={() => setActiveTab("guide")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "guide"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
          }`}
        >
          📚 Hướng dẫn
        </button>
        <button
          onClick={() => setActiveTab("demo")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "demo"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
          }`}
        >
          ✨ Demo Dịch thuật
        </button>
      </div>

      {/* Guide Content */}
      {activeTab === "guide" && (
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Section 1: What is i18n */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                🌍 Hệ thống Dịch thuật Tự động i18n
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Đây là một hệ thống tự động hóa hoàn toàn cho việc{" "}
                <span className="text-blue-400 font-semibold">
                  quản lý và dịch thuật nội dung đa ngôn ngữ
                </span>
                . Thay vì phải dịch giả trực tiếp vào code, chúng ta sử dụng{" "}
                <span className="text-blue-400 font-semibold">Google Sheet</span>{" "}
                làm nơi lưu trữ và quản lý các bản dịch.
              </p>
            </div>

            {/* Section 2: Workflow */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                🔄 Cách hoạt động - 4 bước đơn giản
              </h2>

              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "📝 Dev viết code + dịch tiếng Anh",
                    desc: "Lập trình viên phát triển feature mới và viết các chuỗi text bằng tiếng Anh (ngôn ngữ mặc định).",
                  },
                  {
                    num: 2,
                    title: "📊 Cập nhật Google Sheet",
                    desc: "Tất cả các text bản Anh được đưa lên Google Sheet dành riêng cho dịch thuật.",
                  },
                  {
                    num: 3,
                    title: "🌐 Dịch sang các ngôn ngữ khác",
                    desc: "Người được cấp quyền có thể dịch trực tiếp trên Google Sheet mà không cần động vào code.",
                  },
                  {
                    num: 4,
                    title: "⚡ Dev chạy command để đồng bộ",
                    desc: "Hệ thống tự động đọc từ Google Sheet và tạo file JSON. Ứng dụng lập tức áp dụng bản dịch mới!",
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="flex gap-4 pb-4 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                        {step.num}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2.5: Code Example */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                💻 Ví dụ sử dụng trong Code
              </h2>
              <p className="text-gray-300 mb-4">
                Đây là cách dev sử dụng i18n trong React component:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-600 text-sm font-mono">
                <pre className="text-green-400">
{`<h1 className="text-4xl font-bold">
  <Trans>translate.title</Trans>
</h1>

<p className="text-xl font-semibold">
  <Trans>translate.subtitle</Trans>
</p>

<section className="mb-8">
  <h2 className="text-2xl font-bold">
    <Trans>translate.section1Title</Trans>
  </h2>
  <p className="leading-relaxed">
    <Trans>translate.section1Content</Trans>
  </p>
</section>`}
                </pre>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Component sử dụng &lt;Trans&gt; component từ react-i18next để tự động dịch nội dung dựa trên ngôn ngữ hiện tại.
              </p>
            </div>

            {/* Section 3: Benefits */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                ✨ Lợi ích chính
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: "💰",
                    title: "Tiết kiệm chi phí",
                    desc: "Không cần thuê dịch giả",
                  },
                  {
                    icon: "⏱️",
                    title: "Tiết kiệm thời gian",
                    desc: "Không phải manual edit file JSON",
                  },
                  {
                    icon: "✅",
                    title: "Giảm lỗi",
                    desc: "Tự động hóa giảm thiểu sai sót",
                  },
                  {
                    icon: "📊",
                    title: "Quản lý tập trung",
                    desc: "Tất cả bản dịch ở một chỗ",
                  },
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="bg-gray-700/40 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors"
                  >
                    <div className="text-3xl mb-2">{benefit.icon}</div>
                    <h3 className="text-white font-semibold">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Demo Content */}
      {activeTab === "demo" && (
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <article className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border border-gray-700">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
              <Trans>translate.title</Trans>
            </h1>
            <p className="text-xl text-blue-400 font-semibold mb-6">
              <Trans>translate.subtitle</Trans>
            </p>

            <p className="text-gray-300 leading-relaxed mb-8">
              <Trans>translate.intro</Trans>
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                <Trans>translate.section1Title</Trans>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                <Trans>translate.section1Content</Trans>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                <Trans>translate.section2Title</Trans>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                <Trans>translate.section2Content</Trans>
              </p>
            </section>

            <p className="text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-4">
              <Trans>translate.conclusion</Trans>
            </p>
          </article>

          {/* Google Sheet Link */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-8 border border-blue-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              📁 Truy cập Google Sheet
            </h2>
            <p className="text-gray-300 mb-6">
              Để xem hoặc tham gia dịch, vui lòng truy cập file Google Sheet:
            </p>
            <a
              href="https://docs.google.com/spreadsheets/d/1UY7dYDSzMfonEbQsp6TXNn8_rEiKenQS_zdSTRmVGXY/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:shadow-lg transform hover:scale-105"
            >
              📊 Mở Google Sheet
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

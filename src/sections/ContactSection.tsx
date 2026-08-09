import { Mail, MapPin, Phone } from "lucide-react";
import FadeIn from "../components/FadeIn";

const EMAIL = "tranvanthinh186186@gmail.com";
const PHONE = "0947667508";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Phone,
    label: PHONE,
    href: `tel:${PHONE}`,
  },
  {
    icon: MapPin,
    label: "HCM, Viet Nam",
    href: undefined,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 md:pt-40 pb-8 flex flex-col overflow-hidden"
    >
      <div className="flex flex-col items-center text-center">
        <FadeIn y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-widest text-xs sm:text-sm md:text-base opacity-70">
            Got a project in mind?
          </p>
        </FadeIn>

        <FadeIn y={40} delay={0.1}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight whitespace-nowrap mt-4 sm:mt-6"
            style={{ fontSize: "clamp(3rem, 14vw, 180px)" }}
          >
            Let&apos;s talk
          </h2>
        </FadeIn>

        <FadeIn y={20} delay={0.25}>
          <a
            href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
            className="inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 hover:scale-105 mt-10 sm:mt-12"
            style={{
              background:
                "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
              boxShadow:
                "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
              outline: "2px solid #FFFFFF",
              outlineOffset: "-3px",
            }}
          >
            Send me an email
          </a>
        </FadeIn>

        <FadeIn y={20} delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-12 sm:mt-16">
            {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => {
              const content = (
                <span className="flex items-center gap-3 text-[#D7E2EA] font-light uppercase tracking-wide text-xs sm:text-sm md:text-base">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                  {label}
                </span>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  className="hover:opacity-70 transition-opacity duration-200"
                >
                  {content}
                </a>
              ) : (
                <span key={label}>{content}</span>
              );
            })}
          </div>
        </FadeIn>
      </div>

      {/* Footer bar */}
      <div className="mt-20 sm:mt-28 md:mt-32 border-t border-white/10 pt-6 pb-2 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-[10px] sm:text-xs opacity-50">
          Tran Van Thinh
        </span>
        <a
          href="#top"
          className="text-[#D7E2EA] font-light uppercase tracking-widest text-[10px] sm:text-xs opacity-50 hover:opacity-100 transition-opacity duration-200"
        >
          Back to top ↑
        </a>
      </div>
    </section>
  );
}

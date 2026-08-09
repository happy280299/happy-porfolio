import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Web Development',
    description:
      'Building modern, scalable web applications with React, TypeScript, and Next.js — from e-commerce storefronts to real-time admin dashboards.',
  },
  {
    number: '02',
    name: 'Web3 & Blockchain',
    description:
      'Developing decentralized experiences including crypto exchanges, NFT marketplaces, wallet integrations, and Telegram mini apps.',
  },
  {
    number: '03',
    name: 'UI Engineering',
    description:
      'Turning Figma designs into pixel-perfect, accessible interfaces with TailwindCSS, Radix UI, and reusable design systems.',
  },
  {
    number: '04',
    name: 'Motion & Animation',
    description:
      'Bringing interfaces to life with GSAP, Framer Motion, and CSS animations that add energy and storytelling to every product.',
  },
  {
    number: '05',
    name: 'Performance Optimization',
    description:
      'Optimizing Core Web Vitals, bundle size, and rendering performance so applications stay fast at any scale.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-16 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-3 sm:gap-4 pt-2">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

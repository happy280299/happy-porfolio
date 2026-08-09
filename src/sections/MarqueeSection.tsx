import { useEffect, useRef } from "react";

// Row 1 — ảnh tự chụp tại public/projects/<slug>-desktop.png,
// chưa có file thì tự fallback sang mshots.
interface ProjectShot {
  name: string;
  slug: string;
  url: string;
  image: string;
}

const PROJECT_SHOTS: ProjectShot[] = [
  {
    name: "reGentox",
    slug: "regentox",
    url: "https://regentoxvn.com/market",
    image: "/projects/project_img_01.jpg",
  },
  {
    name: "WikEX Exchange",
    slug: "wikex",
    url: "https://wikex.vn/trade/BTC/USDT",
    image: "/projects/project_img_02.jpg",
  },
  {
    name: "GoAds Platform",
    slug: "goads",
    url: "https://www.goads.vn/vi",
    image: "/projects/project_img_03.jpg",
  },
  {
    name: "DOLK",
    slug: "dolk",
    url: "https://dolk.jp/pages/toukenranbu/tsurumaru/",
    image: "/projects/project_img_04.jpg",
  },
  {
    name: "Hashimoto Naika",
    slug: "hashimoto",
    url: "https://www.hashimoto-naika.net/",
    image: "/projects/project_img_05.jpg",
  },
];

function fallbackShot(shot: ProjectShot) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(shot.url)}?w=1400&h=900`;
}

function onImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  const fb = img.dataset.fallback;
  if (fb && img.src !== fb) img.src = fb;
}

// Row 2 — tech stack logos (simpleicons CDN, màu #D7E2EA)
const TECH_LOGOS = [
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TailwindCSS", slug: "tailwindcss" },
  { name: "Redux", slug: "redux" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Framer Motion", slug: "framer" },
  { name: "Sass", slug: "sass" },
  { name: "Vite", slug: "vite" },
  { name: "Docker", slug: "docker" },
  { name: "Git", slug: "git" },
  { name: "Figma", slug: "figma" },
];

function tripled<T>(items: T[]): T[] {
  return [...items, ...items, ...items];
}

const GAP = 12;
const SHOT_W = 420;
const LOGO_W = 206;
// Chiều rộng của MỘT bộ tile (chưa nhân 3) — quãng đường cần kéo để xem hết
const SET_W_1 = PROJECT_SHOTS.length * (SHOT_W + GAP);
const SET_W_2 = TECH_LOGOS.length * (LOGO_W + GAP);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      // Tiến độ 0 → 1 trong suốt quãng section bị pin
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      if (row1Ref.current) {
        // Chạy sang phải: từ -SET_W_1 về 0 (đi hết đúng 1 bộ tile)
        row1Ref.current.style.transform = `translateX(${(progress - 1) * SET_W_1}px)`;
      }
      if (row2Ref.current) {
        // Chạy sang trái: từ 0 về -SET_W_2
        row2Ref.current.style.transform = `translateX(${-progress * SET_W_2}px)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0C0C0C] h-[250vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center gap-3 overflow-hidden">
        {/* Row 1: project screenshots */}
        <div
          ref={row1Ref}
          className="flex gap-3"
          style={{ willChange: "transform" }}
        >
          {tripled(PROJECT_SHOTS).map((shot, i) => (
            <div
              key={`${shot.slug}-${i}`}
              className="relative rounded-2xl overflow-hidden flex-shrink-0 bg-[#161616]"
              style={{ width: SHOT_W, height: 270 }}
            >
              <img
                src={shot.image}
                data-fallback={fallbackShot(shot)}
                onError={onImgError}
                alt={shot.name}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-x-0 bottom-0 px-5 py-3"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(12,12,12,0) 0%, rgba(12,12,12,0.85) 100%)",
                }}
              >
                <span className="text-[#D7E2EA] font-medium uppercase tracking-widest text-xs">
                  {shot.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: tech stack logos */}
        <div
          ref={row2Ref}
          className="flex gap-3"
          style={{ willChange: "transform" }}
        >
          {tripled(TECH_LOGOS).map((tech, i) => (
            <div
              key={`${tech.slug}-${i}`}
              className="flex items-center justify-center gap-3 rounded-2xl flex-shrink-0 border border-white/10 bg-white/[0.03]"
              style={{ width: LOGO_W, height: 80 }}
              title={tech.name}
            >
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/D7E2EA`}
                alt={tech.name}
                loading="lazy"
                className="w-8 h-8 opacity-80"
              />
              <span className="text-[#D7E2EA] font-light uppercase tracking-wider text-xs opacity-70">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

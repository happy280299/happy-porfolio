import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import FadeIn from "../components/FadeIn";
import LiveProjectButton from "../components/LiveProjectButton";

interface Project {
  number: string;
  name: string;
  category: string;
  col1Images: [string, string];
  col2Image: string;
  href: string;
}

// Ảnh tự chụp lưu tại: public/projects/<slug>-desktop.jpg | -mobile.jpg | -tall.jpg
function projectImages(
  slug: string,
): Pick<Project, "col1Images" | "col2Image"> {
  return {
    col1Images: [
      `/projects/${slug}-desktop.jpg`,
      `/projects/${slug}-mobile.jpg`,
    ],
    col2Image: `/projects/${slug}-tall.jpg`,
  };
}

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "reGentox",
    category: "Healthcare E-Commerce",
    href: "https://regentoxvn.com/market",
    ...projectImages("regentox"),
  },
  {
    number: "02",
    name: "Wikex Exchange",
    category: "Crypto Exchange",
    href: "https://wikex.vn/trade/BTC/USDT",
    ...projectImages("wikex"),
  },
  {
    number: "03",
    name: "GoAds Platform",
    category: "AdTech Platform",
    href: "https://www.goads.vn/vi",
    ...projectImages("goads"),
  },
  {
    number: "04",
    name: "DOLK",
    category: "E-Commerce / Markup",
    href: "https://dolk.jp/pages/toukenranbu/tsurumaru/",
    ...projectImages("dolk"),
  },
  {
    number: "05",
    name: "Hashimoto Naika",
    category: "Clinic Website / Markup",
    href: "https://www.hashimoto-naika.net/",
    ...projectImages("hashimoto"),
  },
];

const CARD_RADIUS = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]";

interface CardProps {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  href: string;
}

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 md:top-32 h-[85vh]">
      <motion.div
        className={`${CARD_RADIUS} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 max-w-6xl mx-auto`}
        style={{
          scale,
          position: "relative",
          top: `${index * 28}px`,
          transformOrigin: "top",
        }}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 px-2 sm:px-4 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-xs sm:text-sm opacity-60">
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-medium uppercase"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton href={project.href} />
        </div>

        {/* Bottom row: image grid */}
        <div className="flex gap-3 sm:gap-4">
          <div
            className="flex flex-col gap-3 sm:gap-4"
            style={{ width: "40%" }}
          >
            <img
              src={project.col1Images[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className={`${CARD_RADIUS} object-cover object-top w-full`}
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <img
              src={project.col1Images[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className={`${CARD_RADIUS} object-cover object-top w-full`}
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <div className="flex" style={{ width: "60%" }}>
            <img
              src={project.col2Image}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className={`${CARD_RADIUS} object-cover object-top w-full h-full`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef}>
        {PROJECTS.map((project, index) => {
          const targetScale = 1 - (PROJECTS.length - 1 - index) * 0.03;
          return (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              progress={scrollYProgress}
              range={[index / PROJECTS.length, 1]}
              targetScale={targetScale}
              href={project.href}
            />
          );
        })}
      </div>
    </section>
  );
}

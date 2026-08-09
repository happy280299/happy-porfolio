import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const total = text.length;
  let charCount = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const start = charCount;
        charCount += word.length + 1;
        return (
          <span key={wi}>
            <span className="inline-block">
              {word.split('').map((char, ci) => {
                const index = start + ci;
                return (
                  <Char
                    key={ci}
                    char={char}
                    progress={scrollYProgress}
                    range={[index / total, Math.min(1, (index + 1) / total)]}
                  />
                );
              })}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
}

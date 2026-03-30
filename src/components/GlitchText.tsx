import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  glitchOnHover?: boolean;
}

const glitchChars = "!<>-_\\/[]{}—=+*^?#________";

const GlitchText = ({ text, className = "", as: Tag = "span", glitchOnHover = false }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(!glitchOnHover);

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return text[i];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        if (!glitchOnHover) setIsGlitching(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, isGlitching, glitchOnHover]);

  const MotionTag = motion[Tag] as any;

  return (
    <MotionTag
      className={`${className} font-display`}
      onMouseEnter={glitchOnHover ? () => setIsGlitching(true) : undefined}
      onMouseLeave={glitchOnHover ? () => { setIsGlitching(false); setDisplayText(text); } : undefined}
    >
      {displayText}
    </MotionTag>
  );
};

export default GlitchText;

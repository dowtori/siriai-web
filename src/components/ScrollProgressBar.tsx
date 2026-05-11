"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] origin-left"
      style={{
        height: "1.5px",
        scaleX,
        background:
          "linear-gradient(90deg, rgba(196,181,253,0.6) 0%, rgba(129,140,248,0.85) 60%, rgba(196,181,253,0.5) 100%)",
      }}
    />
  );
}

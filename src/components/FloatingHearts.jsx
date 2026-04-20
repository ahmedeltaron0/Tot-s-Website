import { useMemo } from "react";
import { motion } from "framer-motion";

function Heart({ delay, duration, left, size, opacity }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${left}%`,
        bottom: "-5%",
        fontSize: `${size}px`,
        opacity: opacity,
      }}
      animate={{
        y: [0, -window.innerHeight * 1.2],
        x: [0, Math.sin(left) * 60, Math.cos(left) * -40, Math.sin(left) * 30],
        rotate: [0, 15, -10, 20, -5, 0],
        opacity: [0, opacity, opacity, opacity * 0.8, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      ❤
    </motion.div>
  );
}

export default function FloatingHearts({ count = 15 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 10,
      left: Math.random() * 100,
      size: 10 + Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
    </div>
  );
}

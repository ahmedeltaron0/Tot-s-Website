import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function DodgingNoButton({ text = "No", onDodge }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isRepositioned, setIsRepositioned] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const messages = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Please? 🥺",
    "Come on...",
    "Don't do this 💔",
    "Reconsider!",
    "Pretty please?",
    "Try 'Yes' instead!",
  ];

  const dodge = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = 240;
    const buttonHeight = 80;

    // Safe bounds (keep button within visible area with padding)
    const padding = 20;
    const maxX = viewportWidth - buttonWidth - padding;
    const maxY = viewportHeight - buttonHeight - padding;
    const minX = padding;
    const minY = padding;

    // Generate random position
    let newX = minX + Math.random() * (maxX - minX);
    let newY = minY + Math.random() * (maxY - minY);

    // Avoid the center area (where "Yes" button is)
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    const avoidRadius = 200;

    const distFromCenter = Math.sqrt(
      Math.pow(newX + buttonWidth / 2 - centerX, 2) +
        Math.pow(newY + buttonHeight / 2 - centerY, 2)
    );

    if (distFromCenter < avoidRadius) {
      // Push away from center
      const angle = Math.atan2(
        newY + buttonHeight / 2 - centerY,
        newX + buttonWidth / 2 - centerX
      );
      newX = centerX + Math.cos(angle) * (avoidRadius + 50) - buttonWidth / 2;
      newY = centerY + Math.sin(angle) * (avoidRadius + 50) - buttonHeight / 2;
    }

    // Clamp to screen bounds
    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    setPosition({ x: newX, y: newY });
    setIsRepositioned(true);
    setDodgeCount((prev) => prev + 1);
    if (onDodge) onDodge();
  }, [onDodge]);

  const currentMessage = messages[Math.min(dodgeCount, messages.length - 1)];

  return (
    <>
      {/* Original position placeholder (hidden after first dodge) */}
      {!isRepositioned && (
        <motion.button
          ref={buttonRef}
          className="relative px-16 py-5 md:px-20 md:py-6 rounded-full font-semibold text-xl sm:text-2xl
                     bg-white/10 backdrop-blur-md border border-white/20
                     text-white/70 hover:text-white transition-colors
                     cursor-pointer select-none z-20 w-full md:w-auto"
          onMouseEnter={dodge}
          onClick={dodge}
          onTouchStart={dodge}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {text}
        </motion.button>
      )}

      {/* Dodging button (absolute position) */}
      {isRepositioned && (
        <motion.button
          className="fixed px-12 py-4 md:px-16 md:py-5 rounded-full font-semibold text-xl md:text-2xl
                     bg-white/10 backdrop-blur-md border border-white/20
                     text-white/70 hover:text-white transition-colors
                     cursor-pointer select-none z-50 shadow-lg"
          style={{
            left: position.x,
            top: position.y,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          onMouseEnter={dodge}
          onClick={dodge}
          onTouchStart={dodge}
        >
          {currentMessage}
        </motion.button>
      )}
    </>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BackgroundSlideshow from "./BackgroundSlideshow";
import FloatingHearts from "./FloatingHearts";
import DodgingNoButton from "./DodgingNoButton";
import { landingConfig } from "../data/pagesData";

export default function LandingPage({ onYes }) {
  const [showYesButton, setShowYesButton] = useState(false);

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background slideshow */}
      <BackgroundSlideshow
        images={landingConfig.backgroundImages}
        interval={landingConfig.slideshowInterval}
      />

      {/* Floating hearts */}
      <FloatingHearts count={18} />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 w-full max-w-5xl mx-auto gap-12 md:gap-24 py-12">
        {/* Decorative glow */}
        <div className="absolute -top-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(232,120,138,0.6) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Icon */}
        <motion.div
          className="text-6xl"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          💕
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold
                     bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300
                     bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {landingConfig.headline}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-xl text-white/50 font-light max-w-lg
                     tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {landingConfig.subheading}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center w-full md:w-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* YES button */}
          <AnimatePresence>
            {showYesButton && (
              <motion.button
                onClick={onYes}
                className="relative px-16 py-6 md:px-24 md:py-8 rounded-full font-bold text-2xl sm:text-3xl lg:text-4xl
                           bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500
                           text-white shadow-2xl shadow-pink-500/30
                           hover:shadow-pink-500/50 transition-shadow duration-300
                           cursor-pointer animate-pulse-glow z-20 w-full md:w-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span
                    className="absolute inset-0 animate-shimmer opacity-30"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                      backgroundSize: "200% auto",
                    }}
                  />
                </span>
                <span className="relative">{landingConfig.yesButtonText}</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* NO button (dodging) */}
          <DodgingNoButton text={landingConfig.noButtonText} onDodge={() => setShowYesButton(true)} />
        </motion.div>

        {/* Playful hint */}
        <motion.p
          className="mt-8 text-white/20 text-sm font-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Go ahead, try to say no... 😏
        </motion.p>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import MediaRenderer from "./MediaRenderer";
import { pagesData, finalPageConfig } from "../data/pagesData";
import { RotateCcw } from "lucide-react";

function RecapCard({ pageData, response, index }) {
  return (
    <motion.div
      className="relative glass-card p-8 sm:p-12 group"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100
                    transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${pageData.accentColor}20 0%, transparent 70%)`,
        }}
      />

      {/* Step number badge */}
      <div
        className="absolute -top-3 -left-2 w-10 h-10 rounded-full flex items-center justify-center
                    text-sm font-bold shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${pageData.accentColor}, ${pageData.accentColor}88)`,
          color: "#1a0a14",
        }}
      >
        {pageData.id}
      </div>

      {/* Title */}
      <div className="mb-10 text-center">
        <h3
          className="text-2xl sm:text-3xl font-semibold text-white/90"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {pageData.title}
        </h3>
      </div>

      {/* Messages grid */}
      <div className="space-y-12 text-center flex flex-col items-center">
        {/* Creator message */}
        <div className="w-full">
          <p className="text-sm tracking-[0.2em] text-pink-300/60 mb-4 font-semibold uppercase">
            My Message
          </p>
          <p className="text-white/70 italic font-light leading-loose text-base md:text-lg max-w-3xl mx-auto">
            "{pageData.message}"
          </p>
        </div>

        {/* User response */}
        <div className="w-full">
          <p className="text-sm tracking-[0.2em] text-rose-300/60 mb-4 font-semibold uppercase">
            Your Response
          </p>
          <p className="text-white/90 leading-loose font-light text-base md:text-lg max-w-3xl mx-auto">
            {response || (
              <span className="text-white/30 italic">No response given</span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FinalRecapPage({ responses, onRestart }) {
  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(232,120,138,0.8) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(232,213,245,0.8) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Floating hearts */}
      <FloatingHearts count={12} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-20 sm:py-32 flex flex-col gap-24 md:gap-32">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8
                       bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200
                       bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {finalPageConfig.title}
          </h1>
          <p className="text-white/50 text-xl font-light tracking-wide">
            {finalPageConfig.subtitle}
          </p>
        </motion.div>

        {/* Featured media */}
        <motion.div
          className="max-w-4xl mx-auto w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="glass-card p-3">
            <MediaRenderer
              type={finalPageConfig.mediaType}
              src={finalPageConfig.mediaSrc}
              alt="Our Love Story"
              className="aspect-video w-full"
            />
          </div>
        </motion.div>

        {/* Recap title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl sm:text-5xl font-semibold text-white/90 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Journey Together
          </h2>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-80" />
        </motion.div>

        {/* Recap cards */}
        <div className="space-y-20 lg:space-y-24 w-full max-w-5xl mx-auto">
          {pagesData.map((pageData, index) => (
            <RecapCard
              key={pageData.id}
              pageData={pageData}
              response={responses[pageData.id]}
              index={index}
            />
          ))}
        </div>

        {/* Closing message */}
        <motion.div
          className="text-center glass-card-strong p-12 sm:p-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xl sm:text-2xl text-white/80 font-light leading-relaxed
                       max-w-2xl mx-auto italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {finalPageConfig.closingMessage}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full
                       bg-gradient-to-r from-pink-500 to-rose-500
                       text-white font-semibold text-base
                       shadow-2xl shadow-pink-500/25 hover:shadow-pink-500/40
                       transition-shadow duration-300 cursor-pointer w-full md:w-auto"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            {finalPageConfig.restartButtonText}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

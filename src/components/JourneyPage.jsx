import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MediaRenderer from "./MediaRenderer";
import ProgressIndicator from "./ProgressIndicator";
import NavigationControls from "./NavigationControls";

export default function JourneyPage({
  pageData,
  pageIndex,
  totalPages,
  response,
  isSubmitted,
  onUpdateResponse,
  onSubmit,
  onNext,
  onBack,
  canGoBack,
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputError, setInputError] = useState(false);

  // Reset success animation when page changes
  useEffect(() => {
    setShowSuccess(false);
    setInputError(false);
  }, [pageIndex]);

  const handleSubmit = () => {
    if (!response || response.trim() === "") {
      setInputError(true);
      setTimeout(() => setInputError(false), 2000);
      return;
    }
    onSubmit();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Background accent */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${pageData.accentColor}33 0%, transparent 60%)`,
        }}
      />

      {/* Layout wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
        
        {/* Horizontal Progress */}
        <motion.div className="flex justify-center w-full mt-4">
          <ProgressIndicator current={pageIndex} total={totalPages} vertical={false} />
        </motion.div>

        {/* Main card */}
        <motion.div
          className="glass-card-strong flex-1 p-5 sm:p-8 lg:p-12 pb-16 sm:pb-20 lg:pb-24 w-full"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Page header */}
          <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
            <span className="text-4xl md:text-5xl">{pageData.icon}</span>
            <h2
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-200 to-rose-300 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {pageData.title}
            </h2>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-start">
            {/* Media section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center items-start w-full"
            >
              <div className="w-full max-w-sm lg:max-w-md aspect-square lg:aspect-[4/5] rounded-[2rem] bg-white/[0.03] border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] flex items-center justify-center p-3 sm:p-5">
                <MediaRenderer
                  type={pageData.mediaType}
                  src={pageData.mediaSrc}
                  alt={pageData.title}
                  className="w-full h-full rounded-2xl md:rounded-3xl shadow-lg border border-white/5"
                />
              </div>
            </motion.div>

            {/* Message + Response section */}
            <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 pt-6">
              {/* Creator message */}
              <motion.div
                className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/80 to-rose-400/80 border border-pink-400/50 shadow-lg text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md">
                  ✨ My Message
                </div>
                <p className="text-white/90 leading-loose mt-2 italic font-light text-base sm:text-lg lg:text-xl text-center">
                  "{pageData.message}"
                </p>
              </motion.div>

              {/* User response */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-5 py-1.5 rounded-full bg-white/10 border border-white/20 shadow-lg text-xs font-bold tracking-widest text-white/80 uppercase backdrop-blur-md">
                  Your response 💬
                </div>
                <div className="relative">
                  <textarea
                    value={response || ""}
                    onChange={(e) => onUpdateResponse(e.target.value)}
                    placeholder={pageData.placeholder}
                    disabled={isSubmitted}
                    className={`w-full min-h-[140px] sm:min-h-[160px] p-8 sm:p-10 rounded-3xl
                               bg-white/[0.04] backdrop-blur-md border-2 
                               text-white/90 placeholder-white/30 text-center
                               font-light leading-loose resize-none shadow-inner
                               transition-all duration-300
                               ${
                                 inputError
                                   ? "border-red-500/60 bg-red-500/5"
                                   : isSubmitted
                                   ? "border-emerald-500/30 bg-emerald-500/5"
                                   : "border-white/10 focus:border-pink-400/50 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(244,114,182,0.15)] hover:border-white/20"
                               }
                               ${isSubmitted ? "opacity-80 cursor-not-allowed" : ""}`}
                    rows={5}
                  />
                  {inputError && (
                    <motion.p
                      className="absolute -bottom-6 left-0 text-red-400 text-xs"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Please write something before saving ✍️
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Success toast */}
          {showSuccess && (
            <motion.div
              className="fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl
                         bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30
                         text-emerald-200 text-sm font-medium shadow-2xl"
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              ✨ Your message has been saved with love!
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mt-12 lg:mt-16 pt-8 border-t border-white/10">
            <NavigationControls
              canGoBack={canGoBack}
              canGoNext={pageIndex < totalPages}
              isSubmitted={isSubmitted}
              canSubmit={response && response.trim() !== ""}
              onBack={onBack}
              onNext={onNext}
              onSubmit={handleSubmit}
              currentPage={pageIndex}
              totalPages={totalPages}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

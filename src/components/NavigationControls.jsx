import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

export default function NavigationControls({
  canGoBack = false,
  canGoNext = false,
  canSubmit = true,
  isSubmitted = false,
  onBack,
  onNext,
  onSubmit,
  totalPages,
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-5 sm:gap-6 w-full mx-auto">
      {/* Back button */}
      <div className="w-full sm:w-auto flex justify-start">
        {canGoBack && (
          <motion.button
            onClick={onBack}
            className="group relative flex items-center justify-center px-6 py-3 rounded-full
                       bg-transparent border-2 border-white/20
                       text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5
                       transition-all duration-300 font-semibold tracking-wide text-sm lg:text-base cursor-pointer w-full sm:w-auto min-w-[140px]"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="absolute left-4 w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </motion.button>
        )}
      </div>

      {/* Center — Submit button */}
      <div className="w-full sm:w-auto flex justify-center">
        {!isSubmitted && (
          <motion.button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`flex items-center justify-center gap-3 px-10 py-3.5 rounded-full font-bold text-sm lg:text-base
                        transition-all duration-300 cursor-pointer w-full sm:w-auto tracking-wide
                        ${
                          canSubmit
                            ? "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white shadow-[0_8px_30px_rgb(244,114,182,0.3)] hover:shadow-[0_8px_30px_rgb(244,114,182,0.5)] border border-pink-400/30"
                            : "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                        }`}
            whileHover={canSubmit ? { scale: 1.05, y: -2 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
          >
            <Send className="w-5 h-5" />
            Save My Response
          </motion.button>
        )}
        {isSubmitted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full
                       bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm"
          >
            <span>✓</span>
            Saved with love
          </motion.div>
        )}
      </div>

      {/* Next button */}
      <div className="w-full sm:w-auto flex justify-end">
        {isSubmitted && canGoNext && (
          <motion.button
            onClick={onNext}
            className="group relative flex items-center justify-center px-8 py-3 rounded-full
                       bg-transparent border-2 border-pink-400/60
                       text-pink-300 hover:text-pink-100 hover:bg-pink-500/10 hover:border-pink-300
                       font-bold tracking-wide text-sm lg:text-base
                       transition-all duration-300 cursor-pointer w-full sm:w-auto min-w-[140px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Next</span>
            <ChevronRight className="absolute right-4 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

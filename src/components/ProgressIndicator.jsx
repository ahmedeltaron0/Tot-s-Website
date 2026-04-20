import { motion } from "framer-motion";

export default function ProgressIndicator({ current, total, vertical = false }) {
  const progress = (current / total) * 100;

  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-4 h-full py-8">
        <div className="flex flex-col gap-6 flex-1 relative items-center justify-center">
          {/* Vertical Progress Line Background */}
          <div className="absolute top-0 bottom-0 w-1 bg-white/10 rounded-full" />
          
          {/* Vertical Progress Fill */}
          <div className="absolute top-0 w-1 flex flex-col justify-start overflow-hidden rounded-full h-full pb-4">
             <motion.div
                className="w-full bg-gradient-to-b from-pink-400 via-rose-400 to-pink-500 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
             />
          </div>

          {/* Dots */}
          {Array.from({ length: total }, (_, i) => (
            <motion.div
              key={i}
              className={`z-10 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-[#2d1029] transition-colors duration-500 shadow-md ${
                i + 1 <= current
                  ? "bg-gradient-to-b from-rose-300 to-pink-500 border-[#2d1029] shadow-[0_0_15px_rgba(244,114,182,0.8)] scale-110"
                  : "bg-white/20"
              }`}
              initial={false}
              animate={i + 1 === current ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
        <div className="text-xs font-bold tracking-widest text-white/50 uppercase writing-vertical-rl mt-6 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Step {current} of {total}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 text-sm text-white/50">
        <span className="font-light">Step</span>
        <span className="font-semibold text-white/80">{current}</span>
        <span className="font-light">of</span>
        <span className="font-semibold text-white/80">{total}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #e8788a, #f8b4c6, #e8d5f5)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Step dots */}
      <div className="flex gap-2">
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i + 1 <= current
                ? "bg-gradient-to-r from-pink-400 to-rose-400"
                : "bg-white/15"
            }`}
            style={
              i + 1 <= current
                ? { background: "linear-gradient(135deg, #e8788a, #f8b4c6)" }
                : {}
            }
            initial={false}
            animate={
              i + 1 === current
                ? { scale: [1, 1.4, 1] }
                : {}
            }
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

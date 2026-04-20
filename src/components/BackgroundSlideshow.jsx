import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundSlideshow({ images, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleImageLoad = (src) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  const handleImageError = (src) => {
    setLoadedImages((prev) => ({ ...prev, [src]: "error" }));
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient fallback (always visible) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1029] via-[#1a0a2e] to-[#0d0a14]" />

      {/* Decorative blurred blobs as background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(232,120,138,0.4) 0%, transparent 70%)",
            top: "10%",
            left: "20%",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(232,213,245,0.4) 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
          }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(248,180,198,0.5) 0%, transparent 70%)",
            top: "50%",
            left: "60%",
          }}
          animate={{
            x: [0, 60, -20, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Slideshow images */}
      <AnimatePresence mode="sync">
        {images.map(
          (src, index) =>
            index === currentIndex && (
              <motion.div
                key={src + index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(src)}
                  onError={() => handleImageError(src)}
                  style={{
                    display:
                      loadedImages[src] === "error" ? "none" : "block",
                  }}
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
    </div>
  );
}

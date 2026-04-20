import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff, Film } from "lucide-react";

export default function MediaRenderer({ type = "image", src, alt = "", className = "" }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-pink-900/30 to-purple-900/30 
                     border border-white/10 rounded-3xl ${className}`}
        style={{ minHeight: "250px" }}
      >
        {type === "video" ? (
          <Film className="w-12 h-12 text-white/20 mb-3" />
        ) : (
          <ImageOff className="w-12 h-12 text-white/20 mb-3" />
        )}
        <p className="text-white/30 text-sm font-light">
          {type === "video" ? "Video coming soon" : "Image coming soon"}
        </p>
        <p className="text-white/15 text-xs mt-1">Place your media in /public/assets/</p>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-black/20 ${className}`}>
        <video
          src={src}
          className="w-full h-full object-contain"
          controls
          playsInline
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-black/20 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-purple-900/20 animate-pulse" />
      )}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}

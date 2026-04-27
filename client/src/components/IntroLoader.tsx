import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("nointro")) {
      setVisible(false);
      return;
    }
    const seen = sessionStorage.getItem("kalyro_intro_seen");
    if (seen) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("kalyro_intro_seen", "1");
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const stickerText = "KALYRO · SMART AI · KALYRO · SMART AI · ".repeat(2);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F4D4C8 0%, #F8DDD2 50%, #FAD9CC 100%)" }}
          data-testid="intro-loader"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFE552]/40 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF8B7A]/30 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center"
          >
            <motion.h1
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "-0.04em", opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-black tracking-tight leading-none"
              style={{ fontSize: "clamp(60px, 11vw, 200px)" }}
            >
              KALYRO
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFE552]" />
              <p className="text-black/70 text-xs font-bold uppercase tracking-[0.4em]">
                Smart AI · Smarter Business
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFE552]" />
            </motion.div>

            {/* Loader bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="h-[3px] bg-[#0A0A0A] mt-10 mx-auto rounded-full"
            />
          </motion.div>

          {/* Rotating sticker — bottom right */}
          <div className="absolute bottom-12 right-12 w-28 h-28 hidden md:flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full rotate-slow">
              <defs>
                <path id="loaderCirclePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              </defs>
              <text className="fill-black" style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "2px" }}>
                <textPath href="#loaderCirclePath">{stickerText}</textPath>
              </text>
            </svg>
            <div className="w-12 h-12 rounded-full bg-[#FFE552] flex items-center justify-center">
              <span className="text-black font-black text-lg">K</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

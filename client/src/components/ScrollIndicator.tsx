import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#0A0A0A] z-[80] origin-left"
        style={{ scaleX }}
      />

      {/* Bottom-right floating scroll button */}
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: hidden ? 0 : 1, scale: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-[55] w-16 h-16 rounded-full bg-[#0A0A0A] text-white shadow-2xl flex flex-col items-center justify-center group ring-4 ring-[#FFE552]/40"
        data-testid="button-scroll-indicator"
        aria-label="Scroll down"
      >
        <span className="text-[8px] font-black uppercase tracking-widest mb-0.5 text-[#FFE552]">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" strokeWidth={3} />
        </motion.div>
      </motion.button>
    </>
  );
}

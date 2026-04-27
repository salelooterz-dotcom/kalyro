import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Twitter, X } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/kalyro",
    icon: Instagram,
    bg: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/kalyro",
    icon: Linkedin,
    bg: "bg-[#0A66C2]",
  },
  {
    name: "Twitter/X",
    href: "https://twitter.com/kalyro",
    icon: Twitter,
    bg: "bg-[#F4D4C8]",
  },
];

export default function SocialPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]/50 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
          data-testid="overlay-social"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative bg-[#F4D4C8] rounded-2xl shadow-2xl shadow-black/30 p-10 pt-12 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
            data-testid="popup-social"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-black hover:bg-[#0A0A0A] transition-colors"
              data-testid="button-close-social-popup"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-black text-black mb-8 tracking-tight text-center">
              Find Us at :
            </h3>

            <div className="flex flex-col gap-5">
              {socials.map(({ name, href, icon: Icon, bg }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-[#FFF5F0] transition-colors"
                  data-testid={`link-social-${name.toLowerCase().replace("/", "-")}`}
                >
                  <span
                    className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center text-black shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                  </span>
                  <span className="text-base font-bold text-zinc-200 group-hover:text-black transition-colors">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

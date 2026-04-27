import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = window.scrollY;
      const totalScroll = (scrolled / documentHeight) * 100;
      setProgress(Math.min(totalScroll, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-[100] transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
      data-testid="reading-progress-bar"
    />
  );
}

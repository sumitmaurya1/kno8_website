"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="bg-brand fixed bottom-[5.25rem] right-6 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-button sm:bottom-[6.25rem] sm:right-9"
        >
          <ArrowUp aria-hidden="true" className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

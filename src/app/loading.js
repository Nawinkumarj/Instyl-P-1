"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.4 } }}
        >
          <motion.img
            src="/instyl-s.svg"
            alt="Logo S"
            width={140}
            height={140}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              translate: "-50%, -50%",
            }}
            initial={{ scale: 1 }}
            animate={{
              scale: loading ? 1 : 0.3,
              left: loading ? "50%" : "32px",
              top: loading ? "50%" : "32px",
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 18,
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

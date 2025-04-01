import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

type KorokProps = {
  show: boolean;
};

const Korok: React.FC<KorokProps> = ({ show }) => {
  const { t } = useTranslation();

  const [clickCount, setClickCount] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    if (!visible) return;

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      const audio = new Audio("/assets/sounds/korok-yahaha.mp3");
      audio.play();
      setShowSpeech(true);

      setTimeout(() => {
        setShowSpeech(false);
        setVisible(false);

        setTimeout(() => {
          setVisible(true);
          setClickCount(0);
        }, 500);
      }, 5000);
    }
  };

  const getAnimation = () => {
    switch (clickCount) {
      case 1:
        return {
          animate: {
            x: [0, -5, 5, -5, 5, 0],
            rotate: [0, -5, 5, -5, 5, 0],
          },
          transition: { duration: 0.6 },
        };
      case 2:
        return {
          animate: {
            y: [0, -10],
          },
          transition: { duration: 0.3 },
        };
      case 3:
        return {
          animate: {
            y: [0, -100],
            scale: [1, 1.2, 1],
          },
          transition: { duration: 0.5 },
        };
      default:
        return {};
    }
  };

  return (
    <div className="absolute left-1/5 sm:left-1/3 md:left-1/2 -translate-x-1/2 sm:-translate-x-20 md:-translate-x-50 -translate-y-40 z-1 pointer-events-none transition-all">
      <AnimatePresence>
        {show && visible && (
          <motion.div
            key="korok-wrapper"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -22 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 1 }}
          >
            <motion.img
              key="korok"
              src="/assets/img/korok.png"
              alt="Korok"
              className="w-32 cursor-pointer pointer-events-auto"
              onClick={handleClick}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 0, y: 0 }}
              {...getAnimation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute left-full -top-15 px-4 py-2 bg-white text-black text-sm rounded-lg shadow-lg border border-gray-300 whitespace-nowrap"
          >
            {t("korok")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Korok;

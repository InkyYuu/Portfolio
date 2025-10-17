import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import Informations from "../project/Informations";

type ModalInformationProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ModalInformation({ isOpen, onClose }: ModalInformationProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.scrollbarGutter = "stable";
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
        >
          <div className="rounded-xl border border-gray-600 bg-[var(--color-surface)] backdrop-blur p-5 md:p-6 space-y-4  w-10/12 lg:w-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <CloseIcon fontSize="medium" />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-3 text-white">
              {t("projects.information.title")}
            </h2>

            <Informations />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalInformation;

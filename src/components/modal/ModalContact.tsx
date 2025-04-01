import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "@components/toast/Toast";
import Korok from "@/assets/icons/Korok";

type ModalContactProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalContact = ({ isOpen, onClose }: ModalContactProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showKorok, setShowKorok] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "danger";
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setShowKorok(false);
    }
  }, [isOpen]);

  const validate = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setToast({ message: t("contact.errors.invalidEmail"), type: "error" });
      return false;
    }
    if (subject.length > 150) {
      setToast({ message: t("contact.errors.subjectTooLong"), type: "error" });
      return false;
    }
    if (!message.trim()) {
      setToast({ message: t("contact.errors.emptyMessage"), type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        { email, subject, message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );
      setToast({ message: t("contact.success"), type: "success" });
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setToast({ message: t("contact.errors.sendError"), type: "error" });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
          >
            <Korok show={showKorok} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onAnimationComplete={() => {
                setShowKorok(true);
              }}
              className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-2xl p-8 w-full max-w-lg shadow-2xl relative z-50"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <CloseIcon fontSize="medium" />
              </button>

              <h2 className="text-2xl font-semibold text-center mb-3">
                {t("contact.title")}
              </h2>
              <p className="text-sm text-[var(--color-muted)] text-center mb-6">
                {t("contact.description")}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.emailPlaceholder")}
                  className="bg-transparent border border-gray-600 rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t("contact.subjectPlaceholder")}
                  maxLength={150}
                  className="bg-transparent border border-gray-600 rounded px-3 py-2"
                  required
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  rows={5}
                  className="bg-transparent border border-gray-600 rounded px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-[var(--color-accent)] text-white px-4 py-2 rounded hover:bg-[var(--color-accent-dark)] transition"
                >
                  {t("contact.submit")}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalContact;

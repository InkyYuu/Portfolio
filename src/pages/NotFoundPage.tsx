import { ErrorOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-[400px] h-[400px] bg-[var(--color-accent)] rounded-full blur-3xl opacity-10 z-0"
      />

      <motion.div
        className="z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ErrorOutline className="text-[var(--color-accent)]" fontSize="large" />

        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg text-gray-400 max-w-md">
          {t("notfound.description")}
        </p>

        <div>
          <LanguageSwitcher />
        </div>

        <Link
          to="/"
          className="mt-4 inline-block px-5 py-2 bg-[var(--color-accent)] text-black font-semibold rounded-full hover:bg-blue-400 transition duration-300"
        >
          {t("notfound.back")}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

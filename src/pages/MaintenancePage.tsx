import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import { Construction } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type MaintenanceType = "site" | "page";

const MaintenancePage = ({ type = "site" }: { type?: MaintenanceType }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <motion.div
        className="absolute w-[400px] h-[400px] bg-[var(--color-accent)] rounded-full blur-3xl opacity-20 z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <motion.div
        className="z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-gray-900 rounded-full p-4">
          <Construction
            fontSize="large"
            className="text-[var(--color-accent)] animate-pulse"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">
          {t(`maintenance.${type}.title`)}
        </h1>

        <p className="text-gray-400 max-w-md">
          {t(`maintenance.${type}.description`)}
        </p>

        <div>
          <LanguageSwitcher />
        </div>

        <a
          href="/"
          className="mt-6 inline-block px-5 py-2 bg-[var(--color-accent)] text-black font-semibold rounded-full hover:bg-blue-400 transition duration-300"
        >
          {t("maintenance.back")}
        </a>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;

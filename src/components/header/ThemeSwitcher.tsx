import { useEffect, useState } from "react";
import { DarkMode, LightMode, Lock } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const { t } = useTranslation();

  const [isDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      // onClick={() => setIsDark((prev) => !prev)}
      className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 transition" //hover:bg-gray-700
      title={t("unavailable")} //{t('navbar.switchTheme')}
    >
      {isDark ? (
        <DarkMode fontSize="small" className="text-white" />
      ) : (
        <LightMode fontSize="small" className="text-yellow-500" />
      )}
      <Lock
        fontSize="small"
        className="absolute top-44 right-4 md:top-2 md:right-2 text-white border border-white bg-gray-800/80 rounded-full p-[2px]"
      />
    </button>
  );
};

export default ThemeSwitcher;

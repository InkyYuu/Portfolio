import { useTranslation } from "react-i18next";
import FrFlag from "@/assets/flags/fr.svg";
import EnFlag from "@/assets/flags/en.svg";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(nextLang);
  };

  const getFlag = () => {
    return i18n.language === "fr" ? FrFlag : EnFlag;
  };

  const getLabel = () => {
    return i18n.language.toUpperCase();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-white flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 transition text-sm font-medium"
      title={
        i18n.language === "fr" ? "Switch to English" : "Passer en français"
      }
    >
      <img
        src={getFlag()}
        alt={getLabel()}
        className="w-5 h-5 rounded-full object-cover"
      />
      <span className="text-white">{getLabel()}</span>
    </button>
  );
};

export default LanguageSwitcher;

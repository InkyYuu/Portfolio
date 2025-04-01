import { useTranslation } from "react-i18next";
import FrFlag from "@/assets/flags/fr.svg";
import EnFlag from "@/assets/flags/en.svg";

interface LanguageCardProps {
  language: string;
  level: string;
}

const LanguageCard = ({ language, level }: LanguageCardProps) => {
  const { t } = useTranslation();

  const getFlag = () => {
    return language === "french" ? FrFlag : EnFlag;
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl shadow-md border w-45">
      <div className="w-8 h-8">
        <img
          src={getFlag()}
          alt={`${t(`languages.${language}.label`)} flag`}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-sm">
          {t(`languages.${language}.symbol`)}
        </span>
        <span className="text-xs text-gray-500">
          {t(`languages.level.${level}`)}
        </span>
      </div>
    </div>
  );
};

export default LanguageCard;

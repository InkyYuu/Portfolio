import LanguageCard from "@/components/about/Cards/LanguageCard";
import { useTranslation } from "react-i18next";

interface LanguageCardProps {
  language: string;
  level: string;
}

interface LanguageGridProps {
  languages: LanguageCardProps[];
}

const LanguageGrid = ({ languages }: LanguageGridProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl xl:text-2xl">{t(`about.languages`)}</h2>
      <div className="flex flex-wrap gap-5 justify-start">
        {languages.map((lang, index) => (
          <LanguageCard
            key={index}
            language={lang.language}
            level={lang.level}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageGrid;

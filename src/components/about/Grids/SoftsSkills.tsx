import {
  EmojiObjects,
  Diversity3,
  SelfImprovement,
  Person,
  Checklist,
  TrendingUp,
  RecordVoiceOver,
  AutoFixHigh,
} from "@mui/icons-material";
import SoftSkillCard from "@/components/about/Cards/SoftSkillCard";
import { JSX, useRef } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type SoftSkillCardProps = {
  icon: string;
  label: string;
};

type SoftSkillGridProps = {
  skills: SoftSkillCardProps[];
};

const iconMap: Record<string, JSX.Element> = {
  EmojiObjects: <EmojiObjects fontSize="large" />,
  Diversity3: <Diversity3 fontSize="large" />,
  SelfImprovement: <SelfImprovement fontSize="large" />,
  Person: <Person fontSize="large" />,
  Checklist: <Checklist fontSize="large" />,
  TrendingUp: <TrendingUp fontSize="large" />,
  RecordVoiceOver: <RecordVoiceOver fontSize="large" />,
  AutoFixHigh: <AutoFixHigh fontSize="large" />,
};

const SoftSkillsGrid = ({ skills }: SoftSkillGridProps) => {
  const { t } = useTranslation();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl xl:text-2xl">{t(`about.qualities`)}</h2>
      <div className="relative w-full flex items-center gap-2">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex bg-gray-800 hover:bg-[var(--color-accent)] p-2 rounded-full shadow-lg transition-all duration-200"
        >
          <ArrowBackIosNewIcon fontSize="small" className="text-white" />
        </button>

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scroll-smooth scrollbar-hide md:pr-6 p-1"
        >
          <div className="flex gap-6 w-max pb-4">
            {skills.map((skill, idx) => (
              <SoftSkillCard
                key={idx}
                label={t(`about.softSkills.${skill.label}`)}
                icon={iconMap[skill.icon] || <span>❓</span>}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex bg-gray-800 hover:bg-[var(--color-accent)] p-2 rounded-full shadow-lg transition-all duration-200"
        >
          <ArrowForwardIosIcon fontSize="small" className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SoftSkillsGrid;

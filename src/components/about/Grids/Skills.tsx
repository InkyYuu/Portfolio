import { useRef } from "react";
import SkillCard from "../Cards/SkillCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import SkillLegend from "../Legend";

type SkillCardProps = {
  name: string;
  level?: 0 | 1 | 2;
};

type SkillGridProps = {
  type: string;
  skills: SkillCardProps[];
};

const SkillGrid = ({ type, skills }: SkillGridProps) => {
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
      <div className="flex gap-1 md:gap-2 items-center">
        <h2 className="text-xl xl:text-2xl">{t(`about.${type}`)}</h2>
        <SkillLegend />
      </div>
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
              <div key={idx}>
                <SkillCard {...skill} />
              </div>
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

export default SkillGrid;

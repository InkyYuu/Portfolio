import Timeline from "./Timeline";
import { useTranslation } from "react-i18next";
import timelineData from "@/data/timeline.json";
import skillsData from "@/data/skills.json";
import SkillGrid from "./Grids/Skills";
import SoftSkillsGrid from "./Grids/SoftsSkills";
import LanguageGrid from "./Grids/Languages";

type SkillCardProps = {
  name: string;
  level?: 0 | 1 | 2;
};

type SoftSkillCardProps = {
  icon: string;
  label: string;
};

interface LanguageCardProps {
  language: string;
  level: string;
}

const languagesInformatics: SkillCardProps[] =
  skillsData.languagesInformatics.map((language) => ({
    ...language,
    level: [0, 1, 2].includes(language.level)
      ? (language.level as 0 | 1 | 2)
      : undefined,
  }));
const tools: SkillCardProps[] = skillsData.tools.map((tool) => ({
  ...tool,
  level: [0, 1, 2].includes(tool.level) ? (tool.level as 0 | 1 | 2) : undefined,
}));
const softSkills: SoftSkillCardProps[] = skillsData.qualities;
const languages: LanguageCardProps[] = skillsData.languages;

const About = () => {
  const { t } = useTranslation();

  type TimelineItem = {
    id: string;
    year: string;
    type: "university" | "work" | "certification";
    prevision: boolean;
    information?: boolean;
    details?: boolean;
  };
  type TimelineProps = TimelineItem[];

  const data: TimelineProps = timelineData.map((item) => ({
    ...item,
    type: item.type as "university" | "work" | "certification",
  }));

  return (
    <div>
      <span id="about"></span>
      <section className="relative min-h-screen w-full px-4 md:px-12 py-25 xl:py-30 bg-[var(--color-background)] text-white flex flex-col justify-center gap-5 xl:gap-12">
        <h1 className="text-2xl xl:text-4xl font-bold mb-2 text-center">
          {t("about.title")}
        </h1>
        <div className="flex flex-col xl:grid xl:grid-cols-[40%_55%] xl:gap-20">
          <Timeline items={data} />
          <div className="flex flex-col mt-3 gap-1 xl:justify-between xl:pb-3 xl:mt-0">
            <SkillGrid
              type={"languagesInformatics"}
              skills={languagesInformatics}
            />
            <SkillGrid type={"tools"} skills={tools} />
            <SoftSkillsGrid skills={softSkills} />
            <LanguageGrid languages={languages} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

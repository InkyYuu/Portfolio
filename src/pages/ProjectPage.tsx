import { useParams } from "react-router-dom";
// import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { GitHub, Language } from "@mui/icons-material";
//import { motion } from "framer-motion";
//import { Swiper, SwiperSlide } from "swiper/react";
import projectsData from "@/data/projects.json";

interface Project {
  title: string; // title == projectId donc dans les traductions : projects.${title}.title & projects.${title}.description & projects.${title}.context
  date: string;
  github: string;
  demo?: string;
  page: {
    languages: string[]; // logo trouvable dans /assets/img/skills/${nom_langage}.svg
    tools?: string[]; // logo trouvable dans /assets/img/skills/${nom_outil}.svg
    skills: string[]; // traduction trouvable par projects.${nom_du_skill}
    slider: string[]; // nom des images trouvables dans /assets/projects/${title}/slider/${nom_image_ou_video}
  };
}

const ProjectPage = () => {
  const { projectId } = useParams();
  const { t } = useTranslation();

  const project = projectsData.find((p) => p.title === projectId) as
    | Project
    | undefined;
  if (!project) {
    return <div className="text-white p-10">Projet introuvable.</div>;
  }

  const { title, demo, github } = project;

  return (
    <div className="w-full min-h-screen text-white bg-[var(--color-background)] relative overflow-hidden px-6 py-10 md:px-16 flex flex-col justify-between">
      <h1>{t(`projects.${title}.title`)}</h1>
      <div className="flex gap-4 pt-6">
        <a
          href={github}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-gray-300 transition"
        >
          <GitHub fontSize="small" /> GitHub
        </a>
        {demo && (
          <a
            href="https://links-awordkening.vercel.app"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)] text-black hover:bg-blue-400 transition"
          >
            <Language fontSize="small" /> {t("projects.demo")}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;

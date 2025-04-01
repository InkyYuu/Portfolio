import { GitHub, ArrowOutward } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  date: string;
  github: string;
  languages: string[];
  tags: string[];
}

const ProjectCard = ({
  title,
  date,
  github,
  languages,
  tags,
}: ProjectCardProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <motion.div
      whileHover={!isMobile ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleMobileClick}
      className={`relative group w-full ${
        isMobile
          ? "max-w-[280px] xs:max-w-xs aspect-square"
          : "max-w-sm aspect-square"
      } overflow-hidden rounded-2xl bg-gradient-to-br from-black to-gray-900 transition-shadow duration-300 hover:shadow-[12px_12px_0px_-4px_rgba(0,102,255,0.5)] cursor-pointer`}
    >
      <Link
        to={`/${title}`}
        className={`absolute top-3 right-3 z-10 text-white hover:text-blue-500 
          transition-all duration-500 overflow-hidden
          ${
            isMobile
              ? isOpen
                ? "opacity-100 max-h-100 translate-x-0 rotate-0"
                : "opacity-0 max-h-0 translate-x-4 rotate-45"
              : "opacity-0 max-h-0 translate-x-4 rotate-45 group-hover:opacity-100 group-hover:max-h-100 group-hover:translate-x-0 group-hover:rotate-0"
          }`}
        aria-label="Visit project page"
      >
        <ArrowOutward fontSize={isMobile ? "medium" : "large"} />
      </Link>

      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute top-3 left-3 z-10 text-white hover:text-blue-500 
          transition-all duration-500 overflow-hidden
          ${
            isMobile
              ? isOpen
                ? "opacity-100 max-h-100 translate-x-0 rotate-0"
                : "opacity-0 max-h-0 -translate-x-4 -rotate-45"
              : "opacity-0 max-h-0 -translate-x-4 -rotate-45 group-hover:opacity-100 group-hover:max-h-100 group-hover:translate-x-0 group-hover:rotate-0"
          }`}
        aria-label="View source code on GitHub"
      >
        <GitHub fontSize={isMobile ? "medium" : "large"} />
      </a>

      <div className="relative w-full h-full flex flex-col justify-between p-4 items-center">
        <img
          src={`/assets/projects/${title}/${title}-logo.png`}
          alt={`${t(`projects.${title}.title`)} logo`}
          className={`transition-transform duration-300 px-5 ${
            isMobile
              ? isOpen
                ? "scale-85 max-h-[100px] xs:max-h-[110px] xs:pt-8"
                : "scale-100 max-h-[100px] xs:max-h-[110px] xs:pt-8"
              : "max-h-[130px] mt-7 group-hover:scale-85"
          }`}
        />

        <div
          className={`flex flex-col justify-end px-3 py-2 w-full ${
            isMobile ? (isOpen ? "gap-0" : "gap-2") : "gap-2"
          }`}
        >
          <div className="flex justify-between items-center text-white">
            <h3
              className={`${
                isMobile ? "text-sm xs:text-base" : "text-xl"
              } font-semibold`}
            >
              {t(`projects.${title}.title`)}
            </h3>
            <span className="text-xs xs:text-sm text-gray-400">
              {t(`projects.years.${date}`)}
            </span>
          </div>

          <div
            className={`flex flex-wrap gap-2 text-sm text-blue-300 pr-1 transition-all duration-500 overflow-hidden
              ${
                isMobile
                  ? isOpen
                    ? "mt-0 opacity-0 max-h-0"
                    : "mt-2 opacity-100 max-h-50"
                  : "mt-2 group-hover:mt-0 group-hover:opacity-0 group-hover:max-h-0 opacity-100 max-h-50"
              }
            `}
          >
            {[...languages, ...tags].map((tag, idx) => {
              const isLanguage = languages.includes(tag);
              return (
                <span
                  key={idx}
                  className="text-[0.6rem] xs:text-xs lg:text-sm rounded-full border border-blue-400 px-2 py-1 bg-blue-900/30"
                >
                  {isLanguage
                    ? t(`projects.languages.${tag}`)
                    : t(`projects.tags.${tag}`)}
                </span>
              );
            })}
          </div>

          <p
            className={`text-xs xs:text-sm lg:text-base text-gray-200 text-justify transition-all duration-500 overflow-hidden
              ${
                isMobile
                  ? isOpen
                    ? "opacity-100 max-h-52 mt-2"
                    : "opacity-0 max-h-0"
                  : "opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-52"
              }
            `}
          >
            {t(`projects.${title}.description`)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

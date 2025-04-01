import { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";

type SkillCardProps = {
  name: string;
  level?: 0 | 1 | 2;
};

const levelLabels = ["Débutant", "Intermédiaire", "Avancé"];
const levelColors = ["bg-red-400", "bg-yellow-400", "bg-green-400"];

const SkillCard: FC<SkillCardProps> = ({ name, level }) => {
  const logoSrc = `/assets/img/skills/${name.toLowerCase()}.svg`;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative bg-gray-800 rounded-xl shadow-md text-white overflow-hidden 
             w-24 h-24 flex flex-col items-center justify-between p-2 text-center gap-1"
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={name}
            className="w-full h-full p-0.5 object-contain"
          />
        ) : (
          <span className="text-sm text-gray-400">N/A</span>
        )}
      </div>

      <div className="text-xs font-medium text-center">{name}</div>

      {typeof level === "number" && (
        <Tooltip title={levelLabels[level]}>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i <= level ? levelColors[level] : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </Tooltip>
      )}
    </motion.div>
  );
};

export default SkillCard;

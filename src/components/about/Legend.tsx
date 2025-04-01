import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const SkillLegend = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggle}
        className="text-white hover:text-blue-400 transition"
        aria-label="Afficher la légende"
      >
        <InfoOutlinedIcon fontSize="small" />
      </button>

      <div
        className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-30 md:w-36 bg-gray-800 border border-gray-600 text-white text-sm rounded-md p-3 shadow-lg z-50
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
          transition-opacity duration-300`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span>{t("about.legend.advanced")}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
          <span>{t("about.legend.intermediate")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          <span>{t("about.legend.beginner")}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillLegend;

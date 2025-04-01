import DownloadIcon from "@mui/icons-material/Download";
import { useTranslation } from "react-i18next";

const CvButton = () => {
  const { t } = useTranslation();

  const pdfPath = "/assets/files/CV - Bredeau Kellian.pdf";

  return (
    <span>
      <div className="text-sm md:text-base inline-flex shadow-md rounded-full overflow-hidden border border-gray-600 text-white">
        <a
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="pl-5.5 pr-4 py-2 bg-gray-800 hover:bg-gray-700 border-r border-gray-600 transition font-medium"
        >
          {t("cv.title")}
        </a>

        <a
          href={pdfPath}
          download
          className="pl-2 pr-3 py-2 bg-gray-800 hover:bg-blue-500 transition flex items-center justify-center"
          title={t("cv.download")}
        >
          <DownloadIcon fontSize="small" />
        </a>
      </div>
    </span>
  );
};

export default CvButton;

import { GitHub, LinkedIn } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ModalContactFooterTrigger } from "@/components/modal/ModalTrigger";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full text-gray-300 px-6 py-10 mt-12 border-t border-gray-700 bg-gradient-to-tr from-[var(--color-surface)] to-[var(--color-bg)]">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/inkyyuu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub"
          >
            <GitHub fontSize="medium" />
          </a>
          <a
            href="https://www.linkedin.com/in/kellian-bredeau"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            <LinkedIn fontSize="medium" />
          </a>
          <ModalContactFooterTrigger />
        </div>

        <div className="flex gap-6 text-sm md:text-base">
          <a href={"/#home"} className="hover:underline">
            {t("footer.home")}
          </a>
          •
          <Link to="/legal-notice" className="hover:underline">
            {t("footer.legal")}
          </Link>
        </div>

        <div className="text-xs md:text-sm text-center md:text-right">
          <p>
            © {new Date().getFullYear()} Kellian Bredeau – {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

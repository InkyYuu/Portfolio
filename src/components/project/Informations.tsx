import { Trans, useTranslation } from "react-i18next";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LabelIcon from "@mui/icons-material/Label";
import CodeIcon from "@mui/icons-material/Code";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutward from "@mui/icons-material/ArrowOutward";

function Informations() {
  const { t } = useTranslation();

  const Semibold: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="font-semibold">{children}</span>
  );
  const Medium: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="font-medium">{children}</span>
  );
  const Underline: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="underline underline-offset-2">{children}</span>
  );

  const ChipBase: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-950/70 px-2 py-0.5 text-xs">
      {children}
    </span>
  );

  const IconTags: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ChipBase>
      <LabelIcon fontSize="inherit" /> {children}
    </ChipBase>
  );
  const IconLanguages: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ChipBase>
      <CodeIcon fontSize="inherit" /> {children}
    </ChipBase>
  );
  const IconYear: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ChipBase>
      <CalendarTodayIcon fontSize="inherit" /> {children}
    </ChipBase>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <span className="h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent)] text-black shrink-0 hidden lg:inline-flex">
          <InfoOutlinedIcon fontSize="small" />
        </span>
        <p className="text-white leading-relaxed text-justify">
          <Trans
            i18nKey="projects.information.description"
            t={t}
            components={{
              semibold: <Semibold />,
            }}
          />
        </p>
      </div>
      <ul className="flex flex-col gap-4 list-none m-0 p-0 lg:ml-10">
        <li className="flex items-center gap-4">
          <span className="mt-0.5 inline-flex rounded-md bg-[var(--color-accent-dark)] p-1">
            <SearchIcon fontSize="small" />
          </span>
          <p className="text-white text-justify">
            <Trans
              i18nKey="projects.information.search"
              t={t}
              components={{
                medium: <Medium />,
              }}
            />
          </p>
        </li>

        <li className="flex items-center gap-4">
          <span className="mt-0.5 inline-flex rounded-md bg-[var(--color-accent-dark)] p-1">
            <FilterAltIcon fontSize="small" />
          </span>
          <p className="text-white text-justify">
            <Trans
              i18nKey="projects.information.filter"
              t={t}
              components={{
                semibold: <Semibold />,
                medium: <Medium />,
                chipsIconTags: <IconTags />,
                chipsIconLanguages: <IconLanguages />,
                chipsIconYear: <IconYear />,
                chips: <ChipBase />,
                underline: <Underline />,
              }}
            />
          </p>
        </li>

        <li className="flex items-center gap-4">
          <span className="mt-0.5 inline-flex rounded-md bg-[var(--color-accent-dark)] p-1">
            <GitHubIcon fontSize="small" />
          </span>
          <p className="text-white text-justify">
            <Trans
              i18nKey="projects.information.github"
              t={t}
              components={{
                medium: <Medium />,
                underline: <Underline />,
              }}
            />
          </p>
        </li>

        <li className="flex items-center gap-4">
          <span className="mt-0.5 inline-flex rounded-md bg-[var(--color-accent-dark)] p-1">
            <ArrowOutward fontSize="small" />
          </span>
          <p className="text-white text-justify">
            <Trans
              i18nKey="projects.information.arrow"
              t={t}
              components={{
                semibold: <Semibold />,
                medium: <Medium />,
                underline: <Underline />,
              }}
            />
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Informations;

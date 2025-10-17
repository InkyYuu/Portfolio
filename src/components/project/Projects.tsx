import { useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProjectCard from "./Card";
import projectsData from "@/data/projects.json";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LabelIcon from "@mui/icons-material/Label";
import CodeIcon from "@mui/icons-material/Code";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Informations from "./Informations";
import ModalInformation from "../modal/ModalInformation";

const ProjectListPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>("tags");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const scroll = (direction: string) => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const resetScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const allTags = Object.keys(t("projects.tags", { returnObjects: true }));
  const allLanguages = Object.keys(
    t("projects.languages", { returnObjects: true })
  );
  const allYears = Object.keys(t("projects.years", { returnObjects: true }));

  const toggleFilter = (value: string, state: string[], setState: Function) => {
    setState(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
    resetScroll();
  };

  const resetFilters = () => {
    setSelectedTags([]);
    setSelectedLanguages([]);
    setSelectedYears([]);
    resetScroll();
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchSearch = project.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchTags =
        selectedTags.length === 0 ||
        project.tags.some((tag) => selectedTags.includes(tag));
      const matchLangs =
        selectedLanguages.length === 0 ||
        project.languages.some((lang) => selectedLanguages.includes(lang));
      const matchYears =
        selectedYears.length === 0 || selectedYears.includes(project.date);
      return matchSearch && matchTags && matchLangs && matchYears;
    });
  }, [search, selectedTags, selectedLanguages, selectedYears]);

  const renderFilters = () => {
    const items =
      activeCategory === "tags"
        ? allTags
        : activeCategory === "languages"
        ? allLanguages
        : allYears;

    const state =
      activeCategory === "tags"
        ? selectedTags
        : activeCategory === "languages"
        ? selectedLanguages
        : selectedYears;

    const setState =
      activeCategory === "tags"
        ? setSelectedTags
        : activeCategory === "languages"
        ? setSelectedLanguages
        : setSelectedYears;

    return (
      <div
        className={`flex flex-wrap gap-2 ${
          activeCategory === "years" ? "max-h-40 overflow-y-auto" : ""
        }`}
      >
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggleFilter(item, state, setState)}
            className={`px-2 py-1 text-sm rounded-full border transition ${
              state.includes(item)
                ? "bg-[var(--color-accent)] text-black"
                : "border-gray-500 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {t(`projects.${activeCategory}.${item}`)}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <span id="projects"></span>
      <div className="block lg:hidden">
        <ModalInformation
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
      <section className="relative min-h-screen w-full px-4 md:px-12 py-30 bg-[var(--color-background)] text-white flex flex-col justify-center gap-10">
        <h1 className="text-2xl xl:text-4xl font-bold mb-10 text-center">
          {t("projects.title")}
        </h1>

        <div className="hidden w-full lg:block">
          <div className="rounded-xl border border-gray-600 bg-[var(--color-surface)] backdrop-blur p-5 md:p-6 space-y-4">
            <Informations />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-8 w-full">
            <button
              type="button"
              className="lg:hidden text-white flex items-center bg-gray-700 hover:bg-gray-600 border border-gray-500 p-2.5 rounded-md"
              onClick={() => setModalOpen(true)}
            >
              <InfoOutlinedIcon fontSize="small" />
            </button>
            <div className="relative flex-1 min-w-0 transition-all duration-300">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400">
                <SearchIcon fontSize="small" />
              </span>
              <input
                type="text"
                placeholder={t("projects.search.placeholder")}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetScroll();
                }}
                className="pl-9 pr-9 py-2 rounded-md bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white"
                >
                  <CloseIcon fontSize="small" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-500 flex items-center justify-center gap-2"
              >
                <FilterAltIcon fontSize="small" />{" "}
                {t("projects.search.filter.title")}
              </button>

              <div
                className={`absolute top-full mt-2 right-0 bg-gray-900 border border-gray-600 rounded-md p-4 flex flex-col md:flex-row z-20 w-[91vw] md:w-[40rem] transition-all duration-300 ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-700 md:pr-4 pb-3 md:pb-0 flex flex-row flex-wrap md:flex-nowrap md:flex-col gap-2 justify-between">
                  <div className="flex flex-row w-full justify-between md:w-auto md:flex-col md:gap-2">
                    <button
                      onClick={() => setActiveCategory("tags")}
                      className={`flex items-center gap-2 px-2 py-1 text-xs xs:text-sm rounded-md transition ${
                        activeCategory === "tags"
                          ? "bg-[var(--color-accent)] text-black font-bold"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      <LabelIcon fontSize="small" />{" "}
                      {t("projects.search.filter.tags")}
                    </button>
                    <button
                      onClick={() => setActiveCategory("languages")}
                      className={`flex items-center gap-2 px-2 py-1 text-xs xs:text-sm rounded-md transition ${
                        activeCategory === "languages"
                          ? "bg-[var(--color-accent)] text-black font-bold"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      <CodeIcon fontSize="small" />{" "}
                      {t("projects.search.filter.languages")}
                    </button>
                    <button
                      onClick={() => setActiveCategory("years")}
                      className={`flex items-center gap-2 px-2 py-1 text-xs xs:text-sm rounded-md transition ${
                        activeCategory === "years"
                          ? "bg-[var(--color-accent)] text-black font-bold"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      <CalendarTodayIcon fontSize="small" />{" "}
                      {t("projects.search.filter.years")}
                    </button>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-2 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-400 font-bold"
                  >
                    <RestartAltIcon fontSize="small" />
                    <span>{t("projects.search.filter.reset")}</span>
                  </button>
                </div>
                <div className="md:w-2/3 pt-4 md:pt-0 md:pl-4">
                  {renderFilters()}
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full flex items-center gap-5">
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex bg-gray-800 hover:bg-[var(--color-accent)] p-3 rounded-full shadow-lg transition-all duration-200"
            >
              <ArrowBackIosNewIcon fontSize="medium" className="text-white" />
            </button>

            <div
              ref={scrollRef}
              className="w-full overflow-x-auto scroll-smooth scrollbar-hide md:pr-6 py-1 px-1"
            >
              <div className="flex gap-6 w-max pb-4">
                {filteredProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px]"
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => scroll("right")}
              className="hidden md:flex bg-gray-800 hover:bg-[var(--color-accent)] p-3 rounded-full shadow-lg transition-all duration-200"
            >
              <ArrowForwardIosIcon fontSize="medium" className="text-white" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectListPage;

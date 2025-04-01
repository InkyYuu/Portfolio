import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Close, Settings, Home, Info, Work } from "@mui/icons-material";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import { AnimatePresence, motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      label: t("navbar.home"),
      icon: <Home fontSize="medium" />,
      href: "/#home",
    },
    {
      label: t("navbar.about"),
      icon: <Info fontSize="medium" />,
      href: "/#about",
    },
    {
      label: t("navbar.projects"),
      icon: <Work fontSize="medium" />,
      href: "/#projects",
    },
  ];

  return (
    <nav className="w-full fixed top-4 left-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-screen-3xl pointer-events-auto mx-4 md:mx-8 bg-gray-800/80 backdrop-blur-md rounded-xl">
        <div className="px-4 py-3 flex justify-between items-center">
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center font-bold text-lg hover:scale-110 transition-transform">
              <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            </div>
            <span className="text-xl font-semibold text-white">
              Kellian Bredeau
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-lg group text-gray-200 transition duration-300 ease-in-out"
              >
                <span className="inline-block">
                  {item.label.split("").map((char, i) => (
                    <span
                      key={i}
                      className={`inline-block transition-transform duration-300 group-hover:-translate-y-1 ${
                        char === " " ? "w-1" : ""
                      }`}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </a>
            ))}

            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={toggleDropdown}
                whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.2)" }}
                className="text-gray-200 p-2 rounded-full transition"
              >
                <div
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`w-6 h-6 flex items-center justify-center ${
                    isHovering || showDropdown ? "animate-spin-smooth" : ""
                  }`}
                  style={{
                    animation:
                      isHovering || showDropdown
                        ? "spin-smooth 1s linear infinite"
                        : "none",
                  }}
                >
                  <Settings style={{ width: "100%", height: "100%" }} />
                </div>
              </motion.button>
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-6 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg px-4 py-3 z-[999] w-48"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <LanguageSwitcher />
                      <ThemeSwitcher />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-200 p-2 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-110"
            >
              {isOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-6 py-4 rounded-b-xl animate-fade-in-down overflow-x-hidden">
            <div className="flex justify-between gap-4">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 w-full min-w-[65px] min-h-[65px] border border-white hover:border-blue-500 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-gray-200"
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.label}</span>
                </a>
              ))}
            </div>
            <hr className="border-gray-700" />
            <div className="flex items-center justify-between gap-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

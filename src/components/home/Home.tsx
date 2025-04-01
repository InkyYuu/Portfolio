import { useEffect, useState } from "react";
import {
  KeyboardDoubleArrowDown,
  SportsEsports,
  MusicNote,
  Code,
  Computer,
  Science,
  Extension,
} from "@mui/icons-material";
import Explosion from "@/assets/icons/Explosion";
import popSound from "@/assets/sounds/pop-bulle.mp3";
import profilePic from "@/assets/profile.png";
import { ModalContactTrigger } from "../modal/ModalTrigger";
import CvButton from "@/components/home/Button";
import { useTranslation, Trans } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";

function useIsMediumUp() {
  const [isMediumUp, setIsMediumUp] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMediumUp(e.matches);

    setIsMediumUp(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMediumUp;
}

const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const passions = [
    {
      icon: <SportsEsports fontSize={isMobile ? "small" : "medium"} />,
      label: "games",
    },
    {
      icon: <MusicNote fontSize={isMobile ? "small" : "medium"} />,
      label: "music",
    },
    { icon: <Code fontSize={isMobile ? "small" : "medium"} />, label: "code" },
    {
      icon: <Computer fontSize={isMobile ? "small" : "medium"} />,
      label: "computerScience",
    },
    {
      icon: <Science fontSize={isMobile ? "small" : "medium"} />,
      label: "biopsychology",
    },
    {
      icon: <Extension fontSize={isMobile ? "small" : "medium"} />,
      label: "thinking",
    },
  ];
  const { t } = useTranslation();
  const fullText = t("home.typingText");
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [poppedBubbles, setPoppedBubbles] = useState(passions.map(() => false));
  const isMediumUp = useIsMediumUp();

  useEffect(() => {
    const delay = isDeleting ? 60 : 100;
    const pauseTime = 10000;

    const timeout = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      } else if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && index > 0) {
        setTypedText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [index, isDeleting, fullText]);

  return (
    <div>
      <span id="home"></span>
      <section className="w-full h-screen flex flex-col justify-between items-center px-4 py-10 md:px-10 relative overflow-hidden">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full  md:gap-32 mt-20 md:mt-0">
          <div className="flex-1 flex flex-col mt-10 md:mt-0 md:justify-center gap-6 text-white text-left">
            <h1 className="text-3xl md:text-6xl font-bold">Kellian Bredeau</h1>
            <h2 className="text-lg md:text-2xl text-[var(--color-accent)] font-mono min-h-[1.5rem]">
              {typedText}_
            </h2>

            <p className="text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed space-y-2 font-normal text-justify">
              <Trans
                i18nKey="home.description"
                t={t}
                components={{
                  strong: <strong />,
                  sup: <sup />,
                  span: <span className="italic text-white" />,
                  quote: (
                    <span className="text-[var(--color-accent)] font-bold" />
                  ),
                  br: <br />,
                }}
              />
            </p>
            <div className="flex justify-around mt-2 max-w-2xl">
              <CvButton />
              <ModalContactTrigger />
            </div>
          </div>

          <div className="relative w-35 h-35 xs:w-48 xs:h-48 sm:w-56 sm:h-56 lg:w-[28rem] lg:h-[28rem]">
            <img
              src={profilePic}
              alt="Moi"
              className="rounded-full w-full h-full object-cover border-4 border-[var(--color-accent)] shadow-lg"
            />

            {passions.map((p, i) => {
              const isPopped = poppedBubbles[i];

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (isPopped) return;
                    const audio = new Audio(popSound);
                    audio.volume = 0.2;
                    audio.play();
                    setPoppedBubbles((prev) =>
                      prev.map((val, index) => (index === i ? true : val))
                    );
                    setTimeout(() => {
                      setPoppedBubbles((prev) =>
                        prev.map((val, index) => (index === i ? false : val))
                      );
                    }, 5000);
                  }}
                  className={`absolute w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 rounded-full border border-[var(--color-accent)] flex items-center justify-center shadow-md animate-float${i} cursor-pointer transition-all duration-500 ${
                    isPopped
                      ? "opacity-0 scale-125 cursor-none"
                      : "opacity-100 bg-[var(--color-surface)] text-[var(--color-accent)]"
                  }`}
                  style={{
                    top: `${40 + Math.sin(i) * (isMobile ? 55 : 45)}%`,
                    left: `${40 + Math.cos(i) * (isMobile ? 55 : 45)}%`,
                    zIndex: 10,
                  }}
                  title={!isPopped ? t(`home.passions.${p.label}`) : ""}
                >
                  {isPopped ? (
                    <div className="absolute flex items-center justify-center cursor-auto">
                      <Explosion
                        size={isMediumUp ? 100 : 75}
                        color={"var(--color-accent)"}
                      />
                    </div>
                  ) : (
                    p.icon
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <a
          className="absolute bottom-5 md:bottom-10 animate-bounce text-[var(--color-accent)]"
          href="#about"
        >
          <KeyboardDoubleArrowDown fontSize="large" />
        </a>
      </section>
    </div>
  );
};

export default Home;

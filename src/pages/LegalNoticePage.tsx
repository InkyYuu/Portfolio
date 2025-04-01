import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import { useTranslation, Trans } from "react-i18next";

const LegalNoticePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <section className="min-h-screen w-full px-6 md:px-12 pt-30 pb-5 bg-[var(--color-background)] text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              {t("legal.title")}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              {t("legal.description")}
            </p>
          </header>

          <section className="space-y-4 text-start">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
              {t("legal.author.title")}
            </h2>
            <p className="text-lg">
              <strong>{t("legal.author.nameLabel")}</strong>{" "}
              {t("legal.author.name")}
            </p>
            <p className="text-lg">
              <strong>{t("legal.author.addressLabel")}</strong>{" "}
              {t("legal.author.address")}
            </p>
            <p className="text-lg">
              <strong>{t("legal.author.contactLabel")}</strong>{" "}
              {t("legal.author.contact")}
            </p>
          </section>

          <section className="space-y-4 text-start">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
              {t("legal.host.title")}
            </h2>
            <p className="text-lg">
              <strong>{t("legal.host.nameLabel")}</strong>{" "}
              {t("legal.host.name")}
            </p>
            <p className="text-lg">
              <strong>{t("legal.host.addressLabel")}</strong>{" "}
              {t("legal.host.address")}
            </p>
            <p className="text-lg">
              <strong>{t("legal.host.phoneLabel")}</strong>{" "}
              {t("legal.host.phone")}
            </p>
          </section>

          <section className="space-y-4 text-justify">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
              {t("legal.data.title")}
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              <Trans i18nKey="legal.data.content">
                components=
                {{
                  br: <br />,
                }}
              </Trans>
            </p>
          </section>

          <section className="space-y-4 text-justify">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
              {t("legal.rights.title")}
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {t("legal.rights.content")}
            </p>
            <ul className="list-disc list-inside text-gray-300 text-md md:text-lg space-y-3">
              <li>
                <Trans
                  i18nKey="legal.rights.devicon"
                  components={{
                    a: (
                      <a
                        href="https://devicon.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-400 hover:text-blue-300"
                      />
                    ),
                  }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="legal.rights.mui"
                  components={{
                    a: (
                      <a
                        href="https://mui.com/material-ui/material-icons/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-400 hover:text-blue-300"
                      />
                    ),
                  }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="legal.rights.helena"
                  components={{
                    a: (
                      <a
                        href="https://artena8.github.io/but-portfolio-tailwind/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-400 hover:text-blue-300"
                      />
                    ),
                  }}
                />
              </li>
              <li>{t("legal.rights.design")}</li>
              <li>{t("legal.rights.code")}</li>
            </ul>
          </section>

          <section className="space-y-4 text-justify">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
              {t("legal.responsabilties.title")}
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {t("legal.responsabilties.content")}
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LegalNoticePage;

import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Place,
  Event,
  School,
  Work,
  WorkspacePremium,
} from "@mui/icons-material";

type TimelineItemProps = {
  id: string;
  year: string;
  type: "university" | "work" | "certification";
  prevision: boolean;
  information?: boolean;
  details?: boolean;
};

type TimelineProps = {
  items: TimelineItemProps[];
};

const getIcon = (type: string) => {
  switch (type) {
    case "university":
      return <School fontSize="small" />;
    case "work":
      return <Work fontSize="small" />;
    case "certification":
      return <WorkspacePremium fontSize="small" />;
    default:
      return <Event fontSize="small" />;
  }
};

const getBorderColor = (type: string) => {
  switch (type) {
    case "university":
      return "border-blue-400";
    case "work":
      return "border-green-500";
    case "certification":
      return "border-orange-400";
    default:
      return "border-[var(--color-accent)]";
  }
};

const Timeline: FC<TimelineProps> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-xl xl:text-2xl">{t(`about.career`)}</h2>
      <div className="hidden xl:block relative">
        {items.map((item, i) => (
          <div
            key={i}
            className={`pl-6 border-l-2 py-2 border-[var(--color-accent)] ${
              item.prevision ? "border-l-2 border-dashed" : "border-l-2"
            }`}
          >
            <div
              className={`relative pl-6 py-2 rounded-lg bg-gray-800 shadow-md ${
                item.prevision ? "border-l-2 border-dashed" : "border-l-2"
              } ${getBorderColor(item.type)}`}
            >
              <div
                className={`absolute -left-[10px] top-3 w-4 h-4 rounded-full bg-white border-2 ${getBorderColor(
                  item.type
                )}`}
              />
              <h3
                className={`text-lg font-semibold flex items-center gap-2 ${
                  item.prevision ? "italic text-gray-300" : "text-white"
                }`}
              >
                {getIcon(item.type)} {t(`about.timeline.${item.id}.title`)}
              </h3>
              <p
                className={`text-sm flex items-center gap-3 mt-1 ${
                  item.prevision ? "italic text-gray-500" : "text-gray-300"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Place fontSize="small" />{" "}
                  {t(`about.timeline.${item.id}.location`)}
                </span>
                <span className="flex items-center gap-2">
                  <Event fontSize="small" />{" "}
                  {item.prevision ? t(`about.timeline.expected`) : ""}
                  {item.year}
                </span>
              </p>
              {item.information && (
                <p
                  className={`text-sm mt-2 ${
                    item.prevision ? "italic text-gray-400" : "text-gray-200"
                  }`}
                >
                  {t(`about.timeline.${item.id}.information`)}
                </p>
              )}
              {item.details && (
                <ul
                  className={`list-disc ml-5 mt-1 text-sm space-y-1 ${
                    item.prevision ? "italic text-gray-400" : "text-gray-200"
                  }`}
                >
                  {(
                    t(`about.timeline.${item.id}.details`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="xl:hidden relative overflow-x-auto py-1 mb-2">
        <div className="flex space-x-6 z-10 relative px-4 py-1">
          {items.map((item, i) => (
            <div key={i} className="last:pr-3">
              <div
                className={`min-w-[260px] max-w-[90%] bg-gray-800 p-5 rounded-lg border-l-4 ${
                  item.prevision ? "border-dashed" : ""
                } ${getBorderColor(
                  item.type
                )} relative h-[250px] flex-shrink-0`}
              >
                <h3
                  className={`text-base font-semibold flex items-center gap-2 mb-1 ${
                    item.prevision ? "italic text-gray-300" : "text-white"
                  }`}
                >
                  {getIcon(item.type)} {t(`about.timeline.${item.id}.title`)}
                </h3>

                <div
                  className={`space-y-2 text-xs mb-2 ${
                    item.prevision ? "italic text-gray-500" : "text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Place fontSize="small" />{" "}
                    {t(`about.timeline.${item.id}.location`)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Event fontSize="small" />{" "}
                    {item.prevision ? t(`about.timeline.expected`) : ""}
                    {item.year}
                  </div>
                </div>

                {item.information && (
                  <p
                    className={`text-xs mb-2 ${
                      item.prevision ? "italic text-gray-400" : "text-gray-200"
                    }`}
                  >
                    {t(`about.timeline.${item.id}.information`)}
                  </p>
                )}

                {item.details && (
                  <ul
                    className={`list-disc ml-5 text-xs space-y-1 ${
                      item.prevision ? "italic text-gray-400" : "text-gray-200"
                    }`}
                  >
                    {(
                      t(`about.timeline.${item.id}.details`, {
                        returnObjects: true,
                      }) as string[]
                    ).map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

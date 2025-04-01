import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info" | "danger";
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  message,
  type,
  onClose,
  duration = 5000,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const time = duration;
    const interval = 100;

    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const newProgress = 100 - (elapsed / time) * 100;
      setProgress(newProgress);

      if (elapsed >= time) {
        clearInterval(timer);
        setTimeout(onClose, 100);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onClose]);

  const bgColors: Record<string, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    danger: "bg-yellow-600",
  };

  const barColors: Record<string, string> = {
    success: "bg-green-800",
    error: "bg-red-800",
    info: "bg-blue-800",
    danger: "bg-yellow-800",
  };

  const closeColors: Record<string, string> = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    danger: "text-yellow-800",
  };

  return (
    <div className="fixed z-[1000] top-5 left-1/2 -translate-x-1/2 w-screen flex justify-center">
      <div
        className={`
          ${bgColors[type] || "bg-gray-600"} 
          text-white px-4 py-3 rounded-xl shadow-lg 
          w-auto max-w-full flex items-center justify-between gap-4
          overflow-hidden relative
        `}
      >
        <p className="text-sm font-bold whitespace-nowrap flex-1">{message}</p>
        <button
          onClick={onClose}
          className={`${
            closeColors[type] || "text-gray-800"
          } text-sm font-normal leading-none hover:text-white`}
        >
          <CloseIcon fontSize="small" />
        </button>

        <div className="absolute bottom-0 left-0 w-full h-1">
          <div
            className={`h-full ${barColors[type] || "bg-gray-800"}`}
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

type SoftSkillCardProps = {
  icon: ReactNode;
  label: string;
};

const SoftSkillCard: FC<SoftSkillCardProps> = ({ icon, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-xl shadow-md w-24 h-24 hover:shadow-lg transition-all duration-300 text-white text-center gap-1"
    >
      <div className="text-[var(--color-accent)] text-xl">{icon}</div>
      <span className="text-xs font-medium leading-tight">{label}</span>
    </motion.div>
  );
};

export default SoftSkillCard;

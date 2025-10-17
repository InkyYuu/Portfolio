import { useState, FC } from "react";
import ModalContact from "./ModalContact";
import { useTranslation } from "react-i18next";
import EmailIcon from "@mui/icons-material/Email";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ModalTriggerProps = {
  Modal: FC<ModalProps>;
  buttonText: string;
  type: "text" | "icon";
};

const ModalTrigger: FC<ModalTriggerProps> = ({ Modal, buttonText, type }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span>
        {type == "text" && (
          <button
            onClick={() => setShowModal(true)}
            className="text-sm md:text-base bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-white px-4 py-2 rounded-full hover:bg-[var(--color-accent-dark)] transition-all font-medium"
          >
            {buttonText}
          </button>
        )}
        {type == "icon" && (
          <button
            onClick={() => setShowModal(true)}
            className="text-gray-300 hover:text-white transition"
            title={buttonText}
          >
            <EmailIcon fontSize="medium" />
          </button>
        )}
      </span>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

const ModalContactTrigger: FC = () => {
  const { t } = useTranslation();

  return (
    <ModalTrigger
      Modal={ModalContact}
      buttonText={t("contact.title")}
      type={"text"}
    />
  );
};

const ModalContactFooterTrigger: FC = () => {
  const { t } = useTranslation();

  return (
    <ModalTrigger
      Modal={ModalContact}
      buttonText={t("contact.title")}
      type={"icon"}
    />
  );
};

export { ModalContactTrigger, ModalContactFooterTrigger };

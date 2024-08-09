import React from "react";

interface ModalProps {
  children: React.ReactNode;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ children, setToggleModal }) => {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
      onClick={() => setToggleModal(false)}
    >
      <div className="bg-white rounded-md w-1/2 max-h-[90vh] overflow-auto" onClick={handleInnerClick}>{children}</div>
    </div>
  );
};

export default Modal;

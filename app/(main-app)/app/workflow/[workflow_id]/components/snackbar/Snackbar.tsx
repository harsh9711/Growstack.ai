import { useEffect } from "react";

type SnackbarProps = {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
};

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white text-sm transition-all ${isVisible ? "block" : "hidden"} ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      {message}
    </div>
  );
};

export default Snackbar;

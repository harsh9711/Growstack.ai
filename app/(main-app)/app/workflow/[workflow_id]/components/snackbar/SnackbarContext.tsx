import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import Snackbar from "./Snackbar";

type SnackbarContextType = {
  success: (message: string) => void;
  error: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showSnackbar = useCallback(
    (message: string, type: "success" | "error") => {
      setSnackbar({ message, type, isVisible: true });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  }, []);

  const success = useCallback(
    (message: string) => showSnackbar(message, "success"),
    [showSnackbar]
  );
  const error = useCallback(
    (message: string) => showSnackbar(message, "error"),
    [showSnackbar]
  );

  return (
    <SnackbarContext.Provider value={{ success, error }}>
      {children}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

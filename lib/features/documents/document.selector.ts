// useAuth.ts
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const isEditDecument = () => {
  return useSelector((state: RootState) => state.document.isEdit);
};

const loaderSelector = () => {
  return useSelector((state: RootState) => state.document.loader);
};

const getSavedDecumentForEdit = (): User => {
  return useSelector((state: RootState) => state.document.savedDocumentData);
};

export { isEditDecument, getSavedDecumentForEdit, loaderSelector };

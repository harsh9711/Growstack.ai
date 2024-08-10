import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DocumentState {
  isEdit: boolean;
  savedDocumentData: any;
  loader: boolean;
}

const initialState: DocumentState = {
  isEdit: false,
  savedDocumentData: null,
  loader: false,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    editDocument: (state, action: PayloadAction<any>) => {
      state.isEdit = action.payload;
    },
    savedDecument: (state, action: PayloadAction<any>) => {
      state.savedDocumentData = action.payload;
    },

    isActiveLoader: (state, action: PayloadAction<any>) => {
      state.loader = action.payload;
    },
  },
});

export const { editDocument, savedDecument, isActiveLoader } = documentSlice.actions;
export default documentSlice.reducer;

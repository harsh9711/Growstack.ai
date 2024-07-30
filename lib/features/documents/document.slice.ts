import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DocumentState {
  isEdit: boolean;
  savedDocumentData: any;
}

const initialState: DocumentState = {
  isEdit: false,
  savedDocumentData: null,
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
  },
});

export const { editDocument, savedDecument } = documentSlice.actions;
export default documentSlice.reducer;

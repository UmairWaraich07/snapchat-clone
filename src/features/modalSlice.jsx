import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModal = false;
    },
    openModal: (state) => {
      state.isModal = true;
    },
  },
});

export default modalSlice.reducer;
export const { closeModal, openModal } = modalSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  selectedImage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetSelectedImage: (state) => {
      state.selectedImage = null;
    },
    signout: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { login, setSelectedImage, resetSelectedImage, signout } =
  userSlice.actions;

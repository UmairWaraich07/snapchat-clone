import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "./features/cameraSlice";
import userReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";

const Store = configureStore({
  reducer: {
    camera: cameraReducer,
    user: userReducer,
    modal: modalReducer,
  },
});
export default Store;

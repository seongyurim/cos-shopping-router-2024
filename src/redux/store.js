import { configureStore } from "@reduxjs/toolkit";
import authenticateSlice from "./reducers/authenticateSlice";
import productSlice from "./reducers/productSlice";

const store = configureStore({
  reducer:{
    auth: authenticateSlice,
    product: productSlice
  }
})

export default store;
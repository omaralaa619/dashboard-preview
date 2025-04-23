import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-store";
import cartSclice from "./cart-store";
import deliveryInfoSlice from "./deliveryinfo-store";
import adminUiSlice from "./admin-ui-store";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSclice.reducer,
    deliveryInfo: deliveryInfoSlice.reducer,
    adminUi: adminUiSlice.reducer,
  },
});

export default store;

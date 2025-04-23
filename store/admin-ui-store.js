import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navOpen: false,
  banner: {
    open: false,
    content: "Error occured please try again",

    status: "",
  },
  discountModal: false,
};

const adminUiSlice = createSlice({
  name: "adminUi",
  initialState,
  reducers: {
    openNav(state, action) {
      state.navOpen = true;
    },
    closeNav(state, action) {
      state.navOpen = false;
    },
    toggleNav(state, action) {
      state.navOpen = !state.navOpen;
    },
    openBanner(state, action) {
      state.banner.content = action.payload.content;
      state.banner.open = true;
    },
    hideBanner(state, action) {
      state.banner.content = "";
      state.banner.open = false;
    },
    toggleDiscountModal(state, action) {
      state.discountModal = !state.discountModal;
    },
  },
});

export const adminUiActions = adminUiSlice.actions;

export default adminUiSlice;

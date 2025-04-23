import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navOpen: false,
  cartOpen: false,
  store: {
    banner: {
      content: [""],
      show: false,
    },
  },
};

const uiSlice = createSlice({
  name: "ui",
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
    updateStore(state, action) {
      state.store = action.payload;
    },
    openCart(state, action) {
      state.cartOpen = true;
    },
    closeCart(state, action) {
      state.cartOpen = false;
    },
    toggleCart(state, action) {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

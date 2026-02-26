import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navOpen: false,
  cartOpen: false,
  quickAdd: {
    open: false,
    content: [],
  },
  store: {
    banner: {
      content: [""],
      show: false,
    },
  },
  collections: [
    {
      title: "working??",
      slug: "shop-all",
    },
  ],
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
    updateCollections(state, action) {
      state.collections = action.payload.collections;
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
    toggleQuickAdd(state, action) {
      state.quickAdd.open = !state.quickAdd.open;
    },
    updateQuickAdd(state, action) {
      state.quickAdd.content = action.payload.content;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

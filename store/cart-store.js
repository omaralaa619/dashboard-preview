import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  shipping: { city: "cairo", price: 60 },
};

const cartSclice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      state.totalAmount += action.payload.price;

      if (!existingItem || existingItem?.size != newItem.size) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          size: newItem.size,

          title: newItem.title,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    buyNow(state, action) {
      const item = action.payload;

      state.items = [];

      state.totalQuantity = 1;

      state.totalAmount = action.payload.price;

      state.items.push({
        id: item.id,
        price: item.price,
        quantity: 1,
        totalPrice: item.price,
        size: item.size,
        title: item.title,
        image: item.image,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload.id;
      const size = action.payload.size;

      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      state.changed = true;

      existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
    clearCart(state, action) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    updateShipping(state, action) {
      state.shipping.city = action.payload.city;
      state.shipping.price = action.payload.price;
    },
  },
});

export const cartActions = cartSclice.actions;

export default cartSclice;

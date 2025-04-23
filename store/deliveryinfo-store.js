import { createSlice } from "@reduxjs/toolkit";

const initState = {
  address: {
    name: "",
    email: "",
    number: "",
    city: "",
    streetName: "",
    building: "",
    floor: "",
    apartment: "",
    zone: "",
    instagram: "",
  },
};

const deliveryInfoSlice = createSlice({
  name: "deliveryInfo",
  initialState: initState,
  reducers: {
    updateInfo(state, action) {
      const info = action.payload;

      state.address.name = info.name;
      state.address.email = info.email;
      state.address.number = info.number;
      state.address.city = info.city;
      state.address.streetName = info.streetName;
      state.address.building = info.building;
      state.address.floor = info.floor;
      state.address.apartment = info.apartment;
      state.address.zone = info.zone;
      state.address.instagram = info.instagram;

      if (typeof window !== "undefined") {
        localStorage.setItem("deliveryInfo", JSON.stringify(state));
      }
    },
  },
});

export const deliveryInfoActions = deliveryInfoSlice.actions;

export default deliveryInfoSlice;

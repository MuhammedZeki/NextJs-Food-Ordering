import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

export const CardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      console.log("Action Payload:", action.payload);

      const { product, price, quantity } = action.payload;

      if (!product || !price || !quantity) {
        console.error("Hatalı payload:", action.payload);
        return;
      }

      state.products = [...state.products, { ...product, price, quantity }];
      state.quantity += quantity;
      state.total += price;
    },
    reset: (state) => {
      (state.products = []), (state.quantity = 0), (state.total = 0);
    },
  },
});

export const { addProducts, reset } = CardSlice.actions;

export default CardSlice.reducer;

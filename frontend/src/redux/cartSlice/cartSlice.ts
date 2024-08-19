import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cart } from "../../types/cart";
type addToCart = {
  price: number;
  idCourse: string;
};
const initialState: cart = {
  courses: [],
  totalPrice: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartRedux: (state, action: PayloadAction<addToCart>) => {
      state.courses.push(action.payload.idCourse);
      state.quantity += 1;
      state.totalPrice += action.payload.price;
    },
    remouveFromCartRedux: (state, action: PayloadAction<addToCart>) => {
      state.courses.push(action.payload.idCourse);
      state.quantity -= 1;
      state.totalPrice -= action.payload.price;
    },
  },
});

export const { addToCartRedux, remouveFromCartRedux } = cartSlice.actions;

export default cartSlice.reducer;

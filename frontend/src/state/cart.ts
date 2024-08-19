import { createGlobalState } from ".";
import { cart } from "../types/cart";

export const useCartState = createGlobalState<cart>("cart", {
  courses: [],
  totalPrice: 0,
  quantity: 0,
});

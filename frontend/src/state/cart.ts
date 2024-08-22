import { createGlobalState } from ".";
import { cartSaved } from "../types/cart";

export const useCartState = createGlobalState<cartSaved>("cart", {
  quantity: 0,
  totalPrice: 5,
  _id: "",
});

import { createGlobalState } from ".";
import { cart, cartSaved } from "../types/cart";

export const useCartState = createGlobalState<cartSaved>("cart")

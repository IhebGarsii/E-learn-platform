import { createGlobalState } from ".";
import { cartSaved } from "../types/cart";

export const useCartState = createGlobalState<cartSaved>("cart");

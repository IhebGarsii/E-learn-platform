import { cousers } from "./course";

export type cart = {
  courses: string[];
  totalPrice: number;
  quantity: number;
  _id: string;
};
export type cartSaved = {
  courses?: cousers[];
  totalPrice: number;
  quantity: number;
  _id: string;
};

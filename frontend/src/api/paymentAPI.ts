import { payment } from "../types/paymentOrder";

const BASE_URL = "http://localhost:4000/paymentHistory";

export const addNewPayment = async (newOrder: FormData) => {
  try {
    const obj = Object.fromEntries(newOrder.entries());
    console.log(obj, "ssssssssssssssssssss");
    const response = await fetch(`${BASE_URL}/addNewPayment`, {
      method: "POST",
      body: newOrder,
    });
    if (!response.ok) {
      throw new Error("cant create new payment");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

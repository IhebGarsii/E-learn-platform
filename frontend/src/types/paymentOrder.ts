import { cousers } from "./course";

export type payment = {
  userId: string;
  courseId: cousers[];
  totalAmount: number;
  paymentStatus: string;
  purchasedAt: Date;
};

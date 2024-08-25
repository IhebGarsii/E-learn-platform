import { cousers, rate } from "./course";

export type instructor = {
  courses: cousers[];
  createdAt: Date;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  password: string;
  roles: string[];
  updatedAt: Date;
  avgRate: rate;
  aboutMe: string;
  _id: string;
};

import { instructor } from "./instructor";

export type googleLogin = {
  google: boolean;
  user?: instructor;
  email: string;
  password?: string;
};

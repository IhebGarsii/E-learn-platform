import { instructor } from "./instructor";

export type comment = {
  _id?: string;
  givenUser: string | instructor;
  reply?: [];
  commentText: string;
  idVid?: string;
  gottenUser?: string;
  date?: number;
};

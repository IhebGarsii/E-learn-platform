import { instructor } from "./instructor";

export type comment = {
  givenUser: string | instructor;

  commentText: string;
  idVid?: string;
  gottenUser?: string;
  date?: number;
};

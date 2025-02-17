import { instructor } from "./instructor";

export type replyComment = {
  givenUser: string | instructor;
  commenReplyText: string;
  date?: number;
  commentID: string;
};

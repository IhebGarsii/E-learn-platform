import { instructor } from "./instructor";

export type replyComment = {
  givenUser: instructor | string;
  commentReplyText: string;
  date?: number;
  commentID: string;
};

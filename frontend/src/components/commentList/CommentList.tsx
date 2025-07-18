import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReplyAPI } from "../../api/commentAPI";
import { useState } from "react";
import { formatedDate } from "../../utl/formatedDate";
import { replyComment } from "../../types/replyComment";
import { comment } from "../../types/comment";
type CommentListProp = {
  comment: any;
  idVid?: string;
};
function CommentList({ comment, idVid }: CommentListProp) {
  const queryClient = useQueryClient();

  const [reply, setReply] = useState("");

  const formattedDate = formatedDate(comment.date);
  const { mutate: mutateReply } = useMutation({
    mutationFn: (data: replyComment) => addReplyAPI(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["videoComment", idVid] });
      setReply("");
    },
  });
  const addReply = () => {
    const data = {
      commentID: comment._id,
      commentReplyText: reply,
      givenUser: localStorage.getItem("idUser")!,
    };

    mutateReply(data);
  };
  return (
    <div className=" w-[100%] flex flex-col gap-3  py-5 px-7">
      <div className="flex items-center gap-3 w-fit">
        <img
          className="w-10 h-10 rounded-full"
          src={`http://localhost:4000/uploads/users/${comment.givenUser.image}`}
          alt=""
        />
        <h1 className="font-bold  flex gap-2 ">
          <span>{comment.givenUser.firstName}</span>

          <span> {comment.givenUser.lastName}</span>
        </h1>
        <span className="font-light text-sm w-max ">{formattedDate}</span>
      </div>
      <p className=""> {comment.commentText} </p>
      {true &&
        comment.reply.map((reply: any) => (
          <>
            <div className="flex items-center gap-3 pl-5 w-fit">
              <img
                className="w-10 h-10 rounded-full"
                src={`http://localhost:4000/uploads/users/${reply.givenUser.image}`}
                alt=""
              />
              <div className="font-bold  flex gap-2 ">
                <span>{reply.givenUser.firstName}</span>
                <span> {reply.givenUser.lastName}</span>
              </div>
              <span className="font-light text-sm w-max ">{formattedDate}</span>
            </div>
            <p className="pl-10"> {reply.commentReplyText} </p>
          </>
        ))}
      <div className="pl-5 w-full ">
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReply(e.target.value)
          }
          className="outline-blue-700 border-gray border bg-gray-100 h-10 w-full p-1  "
          placeholder="Write a Reply..."
          value={reply}
        ></textarea>
        <button onClick={addReply}>Add Reply</button>
      </div>
    </div>
  );
}

export default CommentList;

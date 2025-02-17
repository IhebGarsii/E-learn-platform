import { useMutation } from "@tanstack/react-query";
import { addReplyAPI } from "../../api/commentAPI";
import { useState } from "react";
import { comment } from "../../types/comment";
function CommentList({ comment }: any) {
  const [reply, setReply] = useState("");
  // Convert comment.date to a Date object if necessary
  const date = new Date(comment.date);

  // Check if the date is valid
  const formattedDate = !isNaN(date.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date)
    : "Invalid date";

  const { mutate: mutateReply } = useMutation({
    mutationFn: (data: comment) => addReplyAPI(data),
    onSuccess: (data) => console.log("reply added"),
  });
  const addReply = () => {
    const data = {
      commentText: comment,
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
      {true && (
        <div className="flex items-center gap-3 w-fit">
          <img
            className="w-10 h-10 rounded-full"
            src={`http://localhost:4000/uploads/users/${comment.givenUser.image}`}
            alt=""
          />
          <div className="font-bold  flex gap-2 ">
            <span>{comment.givenUser.firstName}</span>
            <span> {comment.givenUser.lastName}</span>
          </div>
          <span className="font-light text-sm w-max ">{formattedDate}</span>
        </div>
      )}
      <div className="pl-5 w-full ">
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReply(e.target.value)
          }
          className="outline-blue-700 border-gray border bg-gray-100 h-10 w-full p-1  "
          placeholder="Write a comment..."
          value={reply}
        ></textarea>
        <button onClick={addReply}>Add Reply</button>
      </div>
    </div>
  );
}

export default CommentList;

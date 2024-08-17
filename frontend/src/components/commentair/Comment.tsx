import { useState } from "react";
import { addCommentToVideo } from "../../api/commentAPI";
import { useMutation } from "@tanstack/react-query";
import { comment } from "../../types/comment";
import { useUserState } from "../../state/user";
type commentProps = {
  idVideo: string;
  idVid: string;
};
function Comment({ idVideo, idVid }: commentProps) {
  const [comment, setComment] = useState("");

  const { data: user } = useUserState();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const addComment = () => {
    const commentToAdded = {
      idVid,
      commentText: comment,
      givenUser: localStorage.getItem("idUser")!,
      date: Date.now(),
    };
    mutateComment(commentToAdded);
  };
  const { mutate: mutateComment } = useMutation({
    mutationFn: (data: comment) => addCommentToVideo(data),
    onSuccess: () => {
      console.log("comment added ");
    },
    onError: (error) => {
      console.log("error in adding the comment", error);
    },
  });
  return (
    <div className="flex  ">
      <img
        className="w-16 h-16 rounded-full"
        src={`http://localhost:4000/uploads/users/${user?.image}`}
        alt=""
      />
      <span> {user?.firstName} </span> <span> {user?.lastName} </span>
      <input
        className="outline-blue-700 bg-gray-100"
        type="text"
        value={comment}
        onChange={handleComment}
      />
      <button onClick={addComment}>add comment</button>
    </div>
  );
}

export default Comment;

import { useState } from "react";
import { addCommentToVideo } from "../../api/commentAPI";
import { useMutation } from "@tanstack/react-query";
import { comment } from "../../types/comment";
type commentProps = {
  idVideo: string;
};
function Comment({ idVideo }: commentProps) {
  const [comment, setComment] = useState("");

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const addComment = () => {
    const data = {
      idVideo,
      commentText: comment,
      givenUser: localStorage.getItem("idUser")!,
    };
    mutateComment(data);
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
    <div className="">
      <input type="text" value={comment} onChange={handleComment} />
      <button onClick={addComment}>add comment</button>
    </div>
  );
}

export default Comment;

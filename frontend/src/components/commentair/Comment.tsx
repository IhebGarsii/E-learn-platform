import { useState } from "react";
import { addCommentToVideo } from "../../api/commentAPI";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { comment } from "../../types/comment";
import { useUserState } from "../../state/user";
type commentProps = {
  idVideo: string;
  idVid: string;
};
function Comment({ idVideo, idVid }: commentProps) {
  const [comment, setComment] = useState("");

  const { data: user } = useUserState();

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const addComment = () => {
    const commentToAdded = {
      idVid,
      commentText: comment,
      givenUser: localStorage.getItem("idUser")!,
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
    <div className="flex flex-col items-start gap-5  w-[50%]  ">
      <textarea
        className="outline-blue-700 border-gray border bg-gray-100 h-20 w-full p-3  "
        value={comment}
        placeholder="Write a comment..."
        onChange={handleComment}
      ></textarea>

      <button
        className="bg-blue-700 text-white py-2 px-3 rounded hover:bg-blue-800"
        onClick={addComment}
      >
        add comment
      </button>
    </div>
  );
}

export default Comment;

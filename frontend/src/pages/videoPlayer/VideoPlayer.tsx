import { useParams } from "react-router-dom";
import Comment from "../../components/commentair/Comment";
import { useCourseState } from "../../state/course";
import { useQuery } from "@tanstack/react-query";
import { getVideoComments } from "../../api/commentAPI";
import CommentList from "../../components/commentList/CommentList";
import { comment } from "../../types/comment";

function VideoPlayer() {
  const { idVideo, idVid } = useParams();
  const { data: course } = useCourseState();

  const { data: video } = useQuery({
    queryKey: ["video"],
    queryFn: () => getVideoComments(course?.video._id!, idVid!),
    enabled: !!course?.video._id,
  });
  if (!video) {
    return <div>fddffddffd</div>;
  }
  return (
    <div className="mt-15   flex flex-col items-center gap-5 justify-center pt-14">
      <video
        style={{ width: "90%", height: "100%" }}
        src={`http://localhost:4000/uploads/courses/${idVideo}`}
        controls
      ></video>
      <div className="flex flex-col items-start w-[90%]   ">
        <Comment idVideo={idVideo!} idVid={idVid!} />

        {video.comments &&
          video.comments.map((comment: comment, index: number) => (
            <CommentList key={index} comment={comment} />
          ))}
      </div>
    </div>
  );
}

export default VideoPlayer;

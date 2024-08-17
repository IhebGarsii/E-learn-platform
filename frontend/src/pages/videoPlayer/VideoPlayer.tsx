import { useParams } from "react-router-dom";
import Comment from "../../components/commentair/Comment";
import { useCourseState } from "../../state/course";
import { useQuery } from "@tanstack/react-query";
import { getVideoComments } from "../../api/commentAPI";

function VideoPlayer() {
  const { idVideo, idVid } = useParams();
  const { data: course } = useCourseState();

  console.log(course?.video._id!);

  const { data: video } = useQuery({
    queryKey: ["video"],
    queryFn: () => getVideoComments(course?.video._id!, idVid!),
    enabled: !!course?.video._id,
  });

  return (
    <div className="mt-15  flex flex-col items-center gap-5 justify-center py-16">
      <video
        style={{ width: "70%", height: "100%" }}
        src={`http://localhost:4000/uploads/courses/${idVideo}`}
        controls
      ></video>
      <Comment idVideo={idVideo!} idVid={idVid!} />
    </div>
  );
}

export default VideoPlayer;

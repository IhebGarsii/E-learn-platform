import { useParams } from "react-router-dom";
import Comment from "../../components/commentair/Comment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideoComments } from "../../api/commentAPI";
import CommentList from "../../components/commentList/CommentList";
import { comment } from "../../types/comment";
import { useEffect, useState } from "react";
import { cousers } from "../../types/course";
import CourseContent from "../../components/courseContent/CourseContent";

function VideoPlayer() {
  const { idVideo, idVid, idCourse } = useParams();
  const queryClient = useQueryClient();
  const [course, setCourse] = useState<cousers>();
  /*   const [Video, setVideo] = useState<cousers>(); */
 
  const { data: videoComents } = useQuery({
    queryKey: ["videoComment",idVid],
    queryFn: () => getVideoComments(course?.video._id!, idVid!),
    enabled: !!course?.video._id && !!idVid,
  });
  useEffect(() => {
    console.log(course?.video._id!, "eeeeeeeeeeeeee");
  }, [course?.video._id!]);
  useEffect(() => {
    setCourse(queryClient.getQueryData(["course", idCourse]));

    if (course) {
      console.log("Course found in cache:", course?.video);
    } else {
      console.log("Course not found in cache, fetching...");
    }
  }, []);


  if (!videoComents) {
    console.log(videoComents);

    return <div className="h-screen bg-red-500">fddffddffd</div>;
  } else {
    console.log(videoComents);
  }
  return (
    <div className="mt-15   flex flex-col items-center gap-5 justify-center pt-14">
      <div className="">
        <video
          style={{ width: "90%", height: "100%" }}
          src={`http://localhost:4000/uploads/courses/${idVideo}`}
          controls
        ></video>
        <div className="flex flex-col items-start w-[90%]   ">
          <Comment idVideo={idVideo!} idVid={idVid!} />

          {videoComents.comments &&
            videoComents.comments.map((comment: comment, index: number) => (
              <CommentList key={index} comment={comment} />
            ))}
        </div>
        {<CourseContent video={course?.video.video} />}
      </div>
    </div>
  );
}

export default VideoPlayer;

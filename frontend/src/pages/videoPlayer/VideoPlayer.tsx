import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideoComments } from "../../api/commentAPI";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Comment from "../../components/commentair/Comment";
import CommentList from "../../components/commentList/CommentList";
import CourseContent from "../../components/courseContent/CourseContent";

import { comment } from "../../types/comment";
import { cousers } from "../../types/course";

function VideoPlayer() {
  const { idVideo, idVid, idCourse } = useParams();
  const queryClient = useQueryClient();

  const [course, setCourse] = useState<cousers>();

  useEffect(() => {
    const cachedCourse = queryClient.getQueryData<cousers>([
      "course",
      idCourse,
    ]);
    setCourse(cachedCourse);

    if (cachedCourse) {
      console.log("Course found in cache:", cachedCourse.video);
    } else {
      console.log("Course not found in cache, fetching...");
    }
  }, [idCourse, queryClient]);

  const { data: videoComents, isLoading } = useQuery({
    queryKey: ["videoComment", idVid],
    queryFn: () => getVideoComments(course?.video._id!, idVid!),
    enabled: !!course?.video._id && !!idVid,
  });

  if (isLoading || !course) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 text-xl">
        Loading video...
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10 px-4 w-full max-w-6xl mx-auto">
      {/* Video Player */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg mb-8">
        <ReactPlayer
          src={`http://localhost:4000/uploads/courses/${idVideo}`}
          controls
          width="100%"
          height="100%"
          className="rounded-xl overflow-hidden shadow-md"
        />
      </div>

      {/* Comments */}
      <div className="mb-10 w-full space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h2>

        {/* Add new comment */}
        <Comment idVideo={idVideo!} idVid={idVid!} />

        {/* List comments */}
        {videoComents?.comments?.length > 0 ? (
          videoComents.comments.map((comment: comment, index: number) => (
            <CommentList key={index} comment={comment} idVid={idVid} />
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Course Content */}
      {course?.video.video && (
        <div className="w-full mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Course Content
          </h2>
          <CourseContent video={course.video.video} />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;

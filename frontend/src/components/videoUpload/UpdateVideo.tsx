import { useEffect, useState } from "react";
import { fullVideo, video, videoResponse } from "../../types/video";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineOndemandVideo } from "react-icons/md";
import img from "../../assets/arrow-dwon.png";
import { cousers } from "../../types/course";

function UpdateVideo() {
  const { idCourse } = useParams();
  const queryClient = useQueryClient();
  const [video, setVideo] = useState<fullVideo>();
  let course: cousers;

  useEffect(() => {
    course = queryClient.getQueryData(["course", idCourse])!;
    console.log("ccccccccc", course.video);

    setVideo(course.video);

    if (video) {
      console.log("Course found in cache:", video);
    } else {
      console.log("Course not found in cache, fetching...", video);
    }
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteVideo(idVideo)
  });
  const handleDelete = (idVideo: string) => {};

  return (
    <div className="border-2 border-gray-300 py-2  ">
      {video &&
        video.video.map((vid, index) => (
          <div key={index}>
            <h1 className="flex items-center text-xl font-bold gap-2 cursor-pointer border-b-2 border-gray-300 pl-5 pb-1">
              <img className="w-3" src={img} alt="Toggle dropdown" />
              <span>{vid.sectionTitle}</span>
            </h1>
            <ul>
              {vid.videoList.map((video, vidIndex) => (
                <div className="flex" key={vidIndex}>
                  <Link
                    to={`/Course/${idCourse}/${video._id}/${video.videoName}`}
                    className="flex items-center gap-4 underline text-lg  cursor-pointer ml-12 text-blue-700"
                  >
                    <span> {} </span>
                    <MdOutlineOndemandVideo /> {video.videoName?.split(".")[0]}
                  </Link>
                  <button onClick={() => handleDelete(video_id)}>delete</button>
                </div>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default UpdateVideo;

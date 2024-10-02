import { useEffect, useState } from "react";
import { fullVideo} from "../../types/video";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineOndemandVideo } from "react-icons/md";
import img from "../../assets/arrow-dwon.png";
import { cousers } from "../../types/course";
import { deleteVideo } from "../../api/videoAPI";

function UpdateVideo() {
  const { idCourse } = useParams();
  const queryClient = useQueryClient();
  const [videos, setVideo] = useState<fullVideo>();
  let course: cousers;

  useEffect(() => {
    course = queryClient.getQueryData(["course", idCourse])!;
    console.log("ccccccccc", course.video);

    setVideo(course.video);

    if (videos) {
      console.log("Video found in cache:", videos);
    } else {
      console.log("video not found in cache, fetching...", videos);
    }
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: ({
      idVideos,
      idSection,
      idVideo,
    }: {
      idVideos: string;
      idSection: string;
      idVideo: string;
    }) => deleteVideo(idVideos, idSection, idVideo),
  });

  const handleDelete = (
    idVideos: string,
    idSection: string,
    idVideo: string
  ) => {
    // Pass all parameters as a single object
    mutateDelete({ idVideos, idSection, idVideo });
  };

  return (
    <div className="border-2 border-gray-300 py-2  ">
      {videos &&
        videos.video.map((vid, index) => (
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
                  <button
                    onClick={() => handleDelete(videos._id,vid._id , video._id)}
                  >
                    delete
                  </button>
                </div>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default UpdateVideo;

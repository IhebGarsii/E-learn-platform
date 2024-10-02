import { useEffect, useState } from "react";
import { fullVideo } from "../../types/video";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineOndemandVideo } from "react-icons/md";
import img from "../../assets/arrow-dwon.png";
import { cousers } from "../../types/course";
import { addVideo, deleteVideo } from "../../api/videoAPI";

function UpdateVideo() {
  const { idCourse } = useParams();
  const queryClient = useQueryClient();
  const [videos, setVideo] = useState<fullVideo>();
  const [addingVideo, setAddingVideo] = useState(true); //change this to true after testing
  const [videoFile, setVideoFile] = useState<File>();
  let course: cousers;

  useEffect(() => {
    course = queryClient.getQueryData(["course", idCourse])!;

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
  const handleVideoFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setVideoFile(file);
    console.log("file form adding", file);

    /*  formData.append("video", file); */
  };
  const { mutate: mutateAddVideo } = useMutation({
    mutationFn: ({
      formData,
      idVideos,
      idSection,
    }: {
      formData: FormData;
      idVideos: string;
      idSection: string;
    }) => addVideo(formData, idVideos, idSection),
  });
  const handleSubmitVideo = (idVideos: string, idSection: string) => {
    const formData = new FormData();
    formData.append("video", videoFile!);
    mutateAddVideo({ formData, idVideos, idSection });
  };

  return (
    <div className="border-2 border-gray-300 py-2  ">
      {videos &&
        videos.video.map((vid, index) => (
          <div key={index}>
            <h1 className="flex items-center text-xl font-bold gap-2 cursor-pointer border-b-2 border-gray-300 pl-5 pb-1">
              <img className="w-3" src={img} alt="Toggle dropdown" />
              <span>{vid.sectionTitle}</span>{" "}
              <button onClick={() => setAddingVideo(!addingVideo)}>
                Add Video to This Section
              </button>
              {addingVideo && (
                <>
                  <input
                    className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
                    type="file"
                    name="video"
                    onChange={(e) => handleVideoFileChange(e)}
                  />
                  <button
                    onClick={() => handleSubmitVideo(videos._id, vid._id)}
                  >
                    submit
                  </button>
                </>
              )}
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
                    onClick={() => handleDelete(videos._id, vid._id, video._id)}
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

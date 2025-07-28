import { useEffect, useState } from "react";
import { fullVideo } from "../../types/video";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdDelete, MdOutlineOndemandVideo } from "react-icons/md";
import img from "../../../public/arrow-dwon.png";
import { cousers } from "../../types/course";
import { addVideo, deleteVideo } from "../../api/videoAPI";
import { useCourseState } from "../../state/course";
import { getCourse } from "../../api/coursesAPI";

function UpdateVideo() {
  const { idCourse } = useParams();
  const queryClient = useQueryClient();
  const [addingVideo, setAddingVideo] = useState(true); //change this to true after testing
  const [videoFile, setVideoFile] = useState<File>();

  const { data: course } = useQuery({
    queryKey: ["course", idCourse],
    queryFn: () => getCourse(idCourse!),
    enabled: !!idCourse,
  });
  console.log(course.video);

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
    onSuccess: (data) => {
      console.log("Video deleted successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["course", idCourse],
      });
    },
  });

  const handleDelete = (
    idVideos: string,
    idSection: string,
    idVideo: string
  ) => {
    // Pass all parameters as a single object
    console.log(idVideos, idSection, idVideo);

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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["course", idCourse],
      });
    },
  });
  const handleSubmitVideo = (idVideos: string, idSection: string) => {
    const formData = new FormData();
    formData.append("video", videoFile!);
    mutateAddVideo({ formData, idVideos, idSection });
  };

  return (
    <div className="border-2 border-gray-300 py-2  ">
      {course.video &&
        course.video.video.map((vid: any, index: number) => (
          <div key={index}>
            <h1 className="flex items-center text-xl font-bold gap-2 cursor-pointer border-b-2 border-gray-300 pl-5 pb-1">
              <img className="w-3" src={img} alt="Toggle dropdown" />
              <span>{vid.sectionTitle}</span>
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
                    onClick={() =>
                      handleSubmitVideo(course.video?._id!, vid._id)
                    }
                  >
                    submit
                  </button>
                </>
              )}
            </h1>
            <ul>
              {vid.videoList.map((video: any, vidIndex: any) => (
                <div className="flex justify-between p-1 " key={vidIndex}>
                  <Link
                    to={`/Course/${idCourse}/${video._id}/${video.videoName}`}
                    className="flex items-center gap-4 underline text-lg  cursor-pointer ml-12 text-blue-700"
                  >
                    <MdOutlineOndemandVideo /> {video.videoName?.split(".")[0]}
                  </Link>
                  <button
                    className="bg-red-600 text-white px-4 py-2 justify-center rounded"
                    onClick={() =>
                      handleDelete(course.video?._id!, vid._id, video._id)
                    }
                  >
                    <MdDelete />
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

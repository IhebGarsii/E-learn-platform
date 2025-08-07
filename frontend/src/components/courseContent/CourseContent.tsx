import { useState } from "react";
import img from "../../../public/arrow-dwon.png";
import { Link } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { halfVideo, videoResponse } from "../../types/video";
import { useQuery } from "@tanstack/react-query";

import { getCourse } from "../../api/coursesAPI";
import { useStore } from "../../hooks/zustand";
import { cousers } from "../../types/course";
import { FaLockOpen, FaLock } from "react-icons/fa6";
import { CiLock, CiUnlock } from "react-icons/ci";
import toast from "react-hot-toast";

type CourseContentProps = {
  video: halfVideo[];
};

type DropdownState = {
  [key: number]: boolean;
};

function CourseContent({ video }: CourseContentProps) {
  const userId = localStorage.getItem("idUser")!;
  const courseId = useStore((state) => state.courseId);
  // Initialize dropdown state with the first index open
  const [dropdowns, setDropdowns] = useState<DropdownState>({ 0: true });
  const { data: course } = useQuery<cousers>({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId),
    enabled: !!courseId,
  });
  const enrolmentCheck = () => {
    if (course?.studentsId?.includes(userId)) {
      return true;
    } else if (course?.instructorId === userId) {
      return true;
    } else return false;
  };

  const handleDrop = (index: number) => {
    setDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the dropdown state for the clicked index
    }));
  };
  console.log(video, "dddddddddddd");
  const videoDuration = () => {
    let videoD = 0;
    video.forEach((vid) => {
      vid.videoList.forEach((video) => {
        videoD += video.duration;
      });
    });
    const hrs = Math.floor(videoD / 3600);
    const mins = Math.floor((videoD % 3600) / 60);

    const formattedMins = mins.toString().padStart(2, "0");

    if (hrs > 0) {
      return `${hrs}hr:${formattedMins}min`;
    } else {
      return `${mins}min`;
    }
  };
  const pleaseBuyHover = (e: any) => {
    if (!enrolmentCheck()) {
      e.preventDefault();
      console.log("ding dong");
      toast.error("Please buy the course to access the content.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="border-2 border-gray-300 py-2  ">
      {video &&
        video.map((vid, index) => (
          <div key={index}>
            <h1
              className="flex items-center justify-between text-sm  gap-2 cursor-pointer border-b-2 border-gray-300 pl-5 pb-1"
              onClick={() => handleDrop(index)}
            >
              <div className="flex items-center gap-2">
                <img className="w-3" src={img} alt="Toggle dropdown" />
                <span>{vid.sectionTitle}</span>
              </div>
              <div>
                <span>{vid.videoList.length} lectures </span>

                <span> {videoDuration()} </span>
              </div>
            </h1>
            {dropdowns[index] && (
              <ul>
                {vid.videoList.map((video, vidIndex) => (
                  <div className="flex items-center w-full  " key={vidIndex}>
                    <Link
                      to={`/Course/${localStorage.getItem("CourseId")}/${video._id}/${video.videoName}`}
                      className="flex items-center justify-between w-full gap-4 underline text-md cursor-pointer mx-12 text-blue-700"
                      onClick={(e) => pleaseBuyHover(e)}
                    >
                      <div
                        className="flex items-center gap-2"
                      >
                        <MdOutlineOndemandVideo />{" "}
                        {video.videoName?.split(".")[0]}
                      </div>
                      {enrolmentCheck() ? (
                        <CiUnlock className="w-5 h-5 stroke-[1]" />
                      ) : (
                        <CiLock className="w-5 h-5 stroke-[1]" />
                      )}
                    </Link>
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  );
}

export default CourseContent;

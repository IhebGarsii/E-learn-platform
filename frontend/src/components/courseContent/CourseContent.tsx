import { useState } from "react";
import img from "../../../public/arrow-dwon.png";
import { Link } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { videoResponse } from "../../types/video";
import { useQuery } from "@tanstack/react-query";
import { get } from "react-hook-form";
import { getUserById } from "../../api/userAPI";
import { getCourse } from "../../api/coursesAPI";
import { useStore } from "../../hooks/zustand";
import { cousers } from "../../types/course";
type CourseContentProps = {
  video: videoResponse[];
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

  return (
    <div className="border-2 border-gray-300 py-2  ">
      {video &&
        video.map((vid, index) => (
          <div key={index}>
            <h1
              className="flex items-center text-xl font-bold gap-2 cursor-pointer border-b-2 border-gray-300 pl-5 pb-1"
              onClick={() => handleDrop(index)}
            >
              <img className="w-3" src={img} alt="Toggle dropdown" />
              <span>{vid.sectionTitle}</span>
            </h1>
            {dropdowns[index] && (
              <ul>
                {vid.videoList.map((video, vidIndex) => (
                  <div className="flex" key={vidIndex}>
                    <Link
                      to={`/Course/${localStorage.getItem("CourseId")}/${video._id}/${video.videoName}`}
                      className="flex items-center gap-4 underline text-lg  cursor-pointer ml-12 text-blue-700"
                    >
                      <button
                        className="flex items-center gap-2"
                        disabled={!enrolmentCheck()}
                      >
                        <MdOutlineOndemandVideo />{" "}
                        {video.videoName?.split(".")[0]}
                      </button>
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

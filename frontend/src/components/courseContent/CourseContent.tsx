import { useState } from "react";
import img from "../../assets/arrow-dwon.png";
import { Link } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { videoResponse } from "../../types/video";
type CourseContentProps = {
  video: videoResponse[];
};

type DropdownState = {
  [key: number]: boolean;
};

function CourseContent({ video }: CourseContentProps) {
  // Initialize dropdown state with the first index open
  const [dropdowns, setDropdowns] = useState<DropdownState>({ 0: true });
  console.log(video, "vid");
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
                      to={`${video._id}/${video.videoName}`}
                      className="flex items-center gap-4 underline text-lg  cursor-pointer ml-12 text-blue-700"
                    >
                      <span> {} </span>
                      <MdOutlineOndemandVideo /> {video.videoName?.split(".")[0]}
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

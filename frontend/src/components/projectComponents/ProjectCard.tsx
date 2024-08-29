import { useState } from "react";
import { project } from "../../types/project";
import ProjectDetail from "./ProjectDetail";

type ProjectCardProps = {
  project: project;
  key: string;
  onClick: (display: boolean) => void;
};
function ProjectCard({ project, key, onClick }: ProjectCardProps) {
  const [display, setDisplay] = useState(false);
  const handleClick = () => {
    setDisplay(!display);
    onClick(display);
  };
  return (
    /* From Uiverse.io by Javierrocadev */
    <div className="w-60 h-60 bg-gray-50 p-3  flex flex-col gap-1 rounded-2xl relative">
      <img
        className="h-40 bg-gray-700 rounded-xl"
        src={`http://localhost:4000/uploads/projects/${project.images[0]}`}
        alt=""
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-xs  w-[60%] truncate ... font-bold">
              {project.title}
            </span>
          </div>
        </div>
        <button
          onClick={() => handleClick()}
          className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md"
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;

import { project } from "../../types/project";

type ProjectCardProps = {
  project: project;
  key: string;
};
function ProjectCard({ project, key }: ProjectCardProps) {
  console.log(project);

  return (
    /* From Uiverse.io by Javierrocadev */
    <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
      <div className="h-48 bg-gray-700 rounded-xl"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-xs  w-[60%] truncate ... font-bold">
              {project.title}
            </span>
            <p className="text-xs text-gray-700">ID: 23432252</p>
          </div>
          <span className="font-bold  text-red-600">$25.99</span>
        </div>
        <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;

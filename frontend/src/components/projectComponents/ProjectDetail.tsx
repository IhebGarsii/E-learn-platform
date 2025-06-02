import { useQuery } from "@tanstack/react-query";
import { useUserState } from "../../state/user";
import { getProject } from "../../api/projectAPI";

function ProjectDetail() {
  const { data: project } = useQuery({
    queryFn: () => getProject(localStorage.getItem("projectId")!),
    queryKey: ["project"],
    enabled: !!localStorage.getItem("projectId"),
  });
  console.log(project, "from project detail");

  return (
    <div>
      <h1> {project.title} </h1>
      <p> {project.description} </p>
    </div>
  );
}

export default ProjectDetail;

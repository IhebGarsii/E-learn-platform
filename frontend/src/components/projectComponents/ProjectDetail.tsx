import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../api/projectAPI";
import DOMPurify from "dompurify";

function ProjectDetail() {
  const { data: project } = useQuery({
    queryFn: () => getProject(localStorage.getItem("projectId")!),
    queryKey: ["project"],
    enabled: !!localStorage.getItem("projectId"),
  });
  console.log(project, "from project detail");
  const sanitizedHtml = DOMPurify.sanitize(project?.description || "");
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">{project?.title}</h1>

      <div
        className="prose max-w-full text-gray-700"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project?.images.map((image: string, index: number) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-300 shadow-sm"
          >
            <img
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              src={`http://localhost:4000/uploads/projects/${image}`}
              alt={`Project Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetail;

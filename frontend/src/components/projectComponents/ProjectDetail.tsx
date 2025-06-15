import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getProject, LikeProject } from "../../api/projectAPI";
import DOMPurify from "dompurify";
import { FaHeart } from "react-icons/fa";
import { useProjectState } from "../../state/project";

interface ProjectDetailProps {
  handleClose: () => void;
}

function ProjectDetail({ handleClose }: ProjectDetailProps) {
  const queryClient = new QueryClient();
  const { setData } = useProjectState();
  const { data: project } = useQuery({
    queryFn: () => getProject(localStorage.getItem("projectId")!),
    queryKey: ["project"],
    enabled: !!localStorage.getItem("projectId"),
  });

  const sanitizedHtml = DOMPurify.sanitize(project?.description || "");
  const { mutate: likeProject } = useMutation({
    mutationFn: (projectId: string) => LikeProject(projectId),
    onSuccess: (data) => {
      console.log("Project liked successfully:", data);
      setData(data);
      /* queryClient.invalidateQueries({ queryKey: ["project"] }); */
    },
  });
  const handleLike = (projectId: string) => {
    likeProject(projectId);
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto relative bg-white rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{project?.title}</h1>
        <button
          onClick={() => handleLike(project?._id)}
          className="text-red-600 hover:text-red-700 text-xl flex items-center gap-1"
          title="Like this project"
        >
          <FaHeart />
          <span>{project?.likes || 0}</span>
        </button>
      </div>

      {/* Description */}
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      {/* Head Tags */}
      {project?.headTags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.headTags.map((tag: string, i: number) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {project?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4 flex-wrap">
        {project?.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub Repo
          </a>
        )}
        {project?.liveDemoLink && (
          <a
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project?.images.map((img: string, index: number) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-300 shadow"
          >
            <img
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              src={`http://localhost:4000/uploads/projects/${img}`}
              alt={`Project image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Visibility */}
      <p className="text-sm text-gray-500">
        Visibility: <strong>{project?.visibility}</strong>
      </p>

      {/* Bottom Close Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleClose}
          className="inline-flex w-22 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProjectDetail;

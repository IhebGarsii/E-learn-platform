import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { project } from "../../types/project";
import { createProjectAPI } from "../../api/projectAPI";

function AddProject() {
  const { register, handleSubmit } = useForm<project>();

  const { mutate: mutateProject } = useMutation({
    mutationFn: (formData: FormData) => createProjectAPI(formData),
  });

  const createProject = (data: project) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("idUser", localStorage.getItem("idUser")!);
    console.log(data);

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((image) => {
        formData.append("images", image);
      });
    }

    mutateProject(formData);
  };

  return (
    <form className="mt-16" onSubmit={handleSubmit(createProject)}>
      <textarea
        {...register("description")}
        placeholder="Enter Description"
        className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
      ></textarea>
      <input
        {...register("images")}
        multiple
        type="file"
        className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}

export default AddProject;

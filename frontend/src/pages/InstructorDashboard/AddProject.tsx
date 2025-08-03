import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { project } from "../../types/project";
import { createProjectAPI } from "../../api/projectAPI";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TagInput from "../../components/tagInput/TagInput";
import { tags } from "../../types/tags";
function AddProject() {
  const { register, handleSubmit, setValue } = useForm<project>();
  const [descValue, setDescValue] = useState("");
  const [tags, setTags] = useState<tags[]>([]);
  const [headTags, setHeadTags] = useState<tags[]>([]);

  const { mutate: mutateProject } = useMutation({
    mutationFn: (formData: FormData) => createProjectAPI(formData),
  });

  const createProject = (data: project) => {
    const formData = new FormData();
    formData.append("description", descValue);
    formData.append("idUser", localStorage.getItem("idUser")!);
    console.log(data);

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((image) => {
        formData.append("images", image);
      });
    }
    if (data.tags) {
      data.tags.forEach((tag) => formData.append("tags", tag));
    }
    if (data.headTags) {
      data.headTags.forEach((tag) => formData.append("headTags", tag));
    }
    formData.append("title", data.title);
    mutateProject(formData);
  };
  const handleHeadTagsChange = (newTags: tags[]) => {
    setHeadTags(newTags);
    setValue(
      "headTags",
      newTags.map((tag) => tag.text)
    );
  };
  const handleTagsChange = (newTags: tags[]) => {
    setTags(newTags);
    setValue(
      "tags",
      newTags.map((tag) => tag.text)
    );
  };

  return (
    <div className="w-[90%] min-h-screen mt-20 lg:w-[40%] mx-auto">
      <form
        className="w-full px-8 py-2 bg-gray-100 flex flex-col gap-2"
        onSubmit={handleSubmit(createProject)}
      >
        {/* Title Field */}
        <label htmlFor="title" className="font-semibold text-gray-700">
          Project Title
        </label>
        <input
          id="title"
          {...register("title")}
          type="text"
          placeholder="Enter project title"
          className="border border-gray-100 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        />

        {/* Description Field */}
        <label htmlFor="description" className="font-semibold text-gray-700">
          Project Description
        </label>
        <div>
          <ReactQuill
            id="description"
            className=" h-ful" // Set height here
            theme="snow"
            placeholder="Enter Description"
            value={descValue}
            onChange={setDescValue}
          />
        </div>
        {/* Image Upload */}
        <label htmlFor="images" className="font-semibold text-gray-700">
          Upload Images
        </label>
        <input
          id="images"
          {...register("images")}
          multiple
          type="file"
          className="border border-gray-100 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        />

        {/* GitHub Link */}
        <label htmlFor="githubLink" className="font-semibold text-gray-700">
          GitHub Link
        </label>
        <input
          id="githubLink"
          {...register("githubLink")}
          type="url"
          placeholder="https://github.com/your-repo"
          className="border border-gray-100 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        />

        {/* Live Demo Link */}
        <label htmlFor="liveDemoLink" className="font-semibold text-gray-700">
          Live Demo Link
        </label>
        <input
          id="liveDemoLink"
          {...register("liveDemoLink")}
          type="url"
          placeholder="https://your-project-live-demo.com"
          className="border border-gray-100 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        />

        {/* Visibility */}
        <label htmlFor="visibility" className="font-semibold text-gray-700">
          Visibility
        </label>
        <select
          id="visibility"
          {...register("visibility")}
          className="border border-gray-100 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {/* Tags */}
        <nav className="flex flex-col">
          <label htmlFor="tags" className="font-semibold text-gray-700">
            Tags
          </label>
          <TagInput tags={tags} onChange={handleTagsChange} />

          <label
            htmlFor="headTags"
            className="font-semibold text-gray-700 mt-4"
          >
            Header Tags
          </label>
          <TagInput tags={headTags} onChange={handleHeadTagsChange} />
        </nav>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProject;

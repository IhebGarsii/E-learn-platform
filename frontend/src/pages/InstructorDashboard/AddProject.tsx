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
    <form
      className="mt-16 h-screen flex flex-col p-2   gap-9"
      onSubmit={handleSubmit(createProject)}
    >
      <input
        {...register("title")}
        type="text"
        className=" border border-gray-50 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
      />
      <ReactQuill
        className=" h-[50%]  border-2 border-blue-500 overflow-hidden "
        theme="snow"
        placeholder="Enter Description"
        value={descValue}
        onChange={setDescValue}
      />
      <input
        {...register("images")}
        multiple
        type="file"
        className=" border border-gray-50 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
      />
      <nav className="flex flex-col">
        <label htmlFor="tags">Tags</label>
        <TagInput tags={tags} onChange={handleTagsChange} />
        <label htmlFor="headTags">Header Tags</label>
        <TagInput tags={headTags} onChange={handleHeadTagsChange} />
      </nav>
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

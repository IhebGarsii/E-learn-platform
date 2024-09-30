import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addCourse } from "../../api/coursesAPI";
import TagInput from "../../components/tagInput/TagInput";
import VideoUpload from "../../components/videoUpload/VideoUpload";
import { tags } from "../../types/tags";
import { cousers } from "../../types/course";
import { useUserState } from "../../state/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function AddCourse() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<cousers>();

  const [tags, setTags] = useState<tags[]>([]);
  const [headTags, setHeadTags] = useState<tags[]>([]);
  const [target, setTarget] = useState<tags[]>([]);
  const [videoSections, setVideoSections] = useState<any[]>([]);
  const [descValue, setDescValue] = useState("");
  const [decpription, setDecpription] = useState("");
  const { setData: setUser } = useUserState();

  const handleTagsChange = (newTags: tags[]) => {
    setTags(newTags);
    setValue(
      "tags",
      newTags.map((tag) => tag.text)
    );
  };

  const handleHeadTagsChange = (newTags: tags[]) => {
    setHeadTags(newTags);
    setValue(
      "headTags",
      newTags.map((tag) => tag.text)
    );
  };

  const handleTargetChange = (newTags: tags[]) => {
    setTarget(newTags);
    setValue(
      "learnTarget",
      newTags.map((tag) => tag.text)
    );
  };

  const handleVideoChange = (updatedSections: File[]) => {
    setVideoSections(updatedSections);
    console.log(updatedSections);
  };

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => addCourse(formData),
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  const submitCourse = async (data: cousers) => {
    const formData = new FormData();
    formData.append("description", descValue);

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof cousers];
      if (value) {
        formData.append(key, value as any); // Use any here to satisfy TypeScript
      }
    });

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    if (data.tags) {
      data.tags.forEach((tag) => formData.append("tags", tag));
    }

    if (data.headTags) {
      data.headTags.forEach((tag) => formData.append("headTags", tag));
    }

    if (data.learnTarget) {
      data.learnTarget.forEach((tag) => formData.append("learnTarget", tag));
    }
    console.log(Array.isArray(videoSections));
    videoSections.forEach((file) => {
      formData.append("video", file);
    });

    formData.append("instructorId", localStorage.getItem("idUser")!);

    mutate(formData);
  };
  const handleDecriptionChange = (NewDecpription: string) => {
    setDecpription(NewDecpription);
  };

  return (
    <div className="w-[90%] min-h-screen mt-20 lg:w-[40%] mx-auto">
      <form
        onSubmit={handleSubmit(submitCourse)}
        className="w-full px-8 py-2 bg-gray-100 flex flex-col gap-2"
      >
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          type="text"
          placeholder="Enter course title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <label htmlFor="secondTitle">Second Title</label>
        <input
          {...register("secondTitle", { required: "Second Title is required" })}
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          type="text"
          placeholder="Enter course Second Title"
        />
        <label htmlFor="description">Description</label>

        <ReactQuill theme="snow" value={descValue} onChange={setDescValue} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <label htmlFor="difficulty">Difficulty Level:</label>
        <select
          {...register("difficultyLevel")}
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          id="difficulty"
        >
          <option value="" disabled>
            Select difficulty level
          </option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.difficultyLevel && (
          <p className="text-red-500">{errors.difficultyLevel.message}</p>
        )}
        <label htmlFor="price">Price:</label>
        <input
          {...register("price")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter course price"
        />
        <label htmlFor="duration">Duration</label>
        <input
          {...register("duration")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter course duration"
        />
        <label htmlFor="language">Language</label>
        <input
          {...register("language")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter course language"
        />
        <label htmlFor="format">Format</label>
        <input
          {...register("format")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter course format"
        />
        <label htmlFor="requirements">Requirements</label>
        <input
          {...register("requirements")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter course requirements"
        />
        <label htmlFor="articles">Articles Number</label>
        <input
          {...register("articles")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter number of articles"
        />
        <label htmlFor="videoDuration">Video Hours</label>
        <input
          {...register("videoDuration")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter video hours"
        />
        <label htmlFor="downloadNb">Downloadable Resources</label>
        <input
          {...register("downloadNb")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter number of downloadable resources"
        />
        <label htmlFor="timeAccess">Access Time</label>
        <input
          {...register("timeAccess")}
          type="text"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Enter access time"
        />
        <label htmlFor="tags">Tags</label>
        <TagInput tags={tags} onChange={handleTagsChange} />
        <label htmlFor="headTags">Header Tags</label>
        <TagInput tags={headTags} onChange={handleHeadTagsChange} />
        <label htmlFor="learnTarget">Learning Targets</label>
        <TagInput tags={target} onChange={handleTargetChange} />
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input
          {...register("thumbnail")}
          type="file"
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Add Course
        </button>
      </form>
      <VideoUpload onChange={handleVideoChange} />
    </div>
  );
}

export default AddCourse;

import { useForm } from "react-hook-form";
import { cousers } from "../../../types/course";
import VideoUpload from "../../videoUpload/VideoUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
type CourseFormProps = {
  submitCourse: (data: cousers) => void;
  handleVideoChange?: () => void;
  handleDecriptionChange: (NewDecpription: string) => void;
  update?: boolean;
};
function CourseForm({
  submitCourse,
  handleVideoChange,
  handleDecriptionChange,
  update,
}: CourseFormProps) {
  const { register, handleSubmit } = useForm<cousers>();
  const [descValue, setDescValue] = useState("");

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
        <label htmlFor="secondTitle">Second Title</label>
        <input
          {...register("secondTitle", { required: "Second Title is required" })}
          className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          type="text"
          placeholder="Enter course Second Title"
        />
        <label htmlFor="description">Description</label>

        <ReactQuill theme="snow" value={descValue} onChange={setDescValue} />

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
        {/*  <label htmlFor="tags">Tags</label>
        <TagInput tags={tags} onChange={handleTagsChange} />
        <label htmlFor="headTags">Header Tags</label>
        <TagInput tags={headTags} onChange={handleHeadTagsChange} />
        <label htmlFor="learnTarget">Learning Targets</label>
        <TagInput tags={target} onChange={handleTargetChange} /> */}
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
      {update && <VideoUpload onChange={handleVideoChange!} />}
    </div>
  );
}

export default CourseForm;

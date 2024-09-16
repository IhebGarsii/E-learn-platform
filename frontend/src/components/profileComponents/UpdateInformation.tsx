import ReactQuill from "react-quill";
import { useUserState } from "../../state/user";
import { useState } from "react";
import TagInput from "../tagInput/TagInput";
import { useForm } from "react-hook-form";
import { tags } from "../../types/tags";

function UpdateInformation() {
  const { setValue } = useForm();
  const [descValue, setDescValue] = useState("");
  const [tags, setTags] = useState<tags[]>([]);
  const { data: user } = useUserState();
  const handleTagsChange = (newTags: tags[]) => {
    setTags(newTags);
    setValue(
      "tags",
      newTags.map((tag) => tag.text)
    );
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="">About Me :</label>
      <ReactQuill theme="snow" value={descValue} onChange={setDescValue} />
      <label htmlFor="">Experience</label>
      <input
        className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Enter Number Of Experience"
        type="number"
      />

      <label htmlFor="">Education</label>
      <input
        className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Enter course duration"
        type="text"
      />

      <label htmlFor="">languages</label>
      <TagInput tags={tags} onChange={handleTagsChange} />
    </div>
  );
}

export default UpdateInformation;

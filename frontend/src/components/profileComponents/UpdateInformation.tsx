import ReactQuill from "react-quill";
import { useUserState } from "../../state/user";
import { useState } from "react";
import TagInput from "../tagInput/TagInput";
import { useForm } from "react-hook-form";
import { tags } from "../../types/tags";
import { instructor } from "../../types/instructor";
import { useMutation } from "@tanstack/react-query";

function UpdateInformation() {
  const { setValue, handleSubmit, register } = useForm<instructor>();
  const [descValue, setDescValue] = useState("");
  const [tags, setTags] = useState<tags[]>([]);
  const [skills, setSkills] = useState<tags[]>([]);
  const { data: user } = useUserState();
  const {mutate:mutateUser}=useMutation({
    mutationFn:
  })
  const handleTagsChange = (newSkill: tags[]) => {
    setSkills(newSkill);
    setValue(
      "skills",
      newSkill.map((skill) => skill.text)
    );
  };
  const handleSkillsChange = (newTags: tags[]) => {
    setTags(newTags);
    setValue(
      "languages",
      newTags.map((tag) => tag.text)
    );
  };
  const handleDescChange = (description: string) => {
    setDescValue(description);
    setValue("aboutMe", descValue);
  };
  const submitInformation = async (data: instructor) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submitInformation)} className="flex flex-col">
      <label htmlFor="">About Me :</label>
      <ReactQuill theme="snow" value={descValue} onChange={handleDescChange} />
      <label htmlFor="">Experience</label>
      <input
        className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Enter Number Of Experience"
        type="number"
        {...register("experience")}
      />

      <label htmlFor="">University</label>
      <input
        className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Enter your University Name"
        type="text"
        {...register("university")}
      />
      <label htmlFor="">Degree</label>
      <input
        className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Enter your Degree Name"
        type="text"
        {...register("degree")}
      />
      <label htmlFor="">languages</label>
      <TagInput tags={tags} onChange={handleTagsChange} />
      <label htmlFor="">Skills</label>
      <TagInput tags={skills} onChange={handleSkillsChange} />
      <button type="submit">update</button>
    </form>
  );
}

export default UpdateInformation;

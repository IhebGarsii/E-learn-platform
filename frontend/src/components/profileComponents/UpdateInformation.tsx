import ReactQuill from "react-quill";
import { useUserState } from "../../state/user";
import { useEffect, useState } from "react";
import TagInput from "../tagInput/TagInput";
import { useForm } from "react-hook-form";
import { tags } from "../../types/tags";
import { instructor } from "../../types/instructor";
import { useMutation } from "@tanstack/react-query";
import { updateUserInformation } from "../../api/userAPI";

function UpdateInformation() {
  const { setValue, handleSubmit, register, reset } = useForm<instructor>();
  const [descValue, setDescValue] = useState("");
  const [tags, setTags] = useState<tags[]>([]);
  const [skills, setSkills] = useState<tags[]>([]);
  const { data: user } = useUserState();
  const { mutate: mutateUser } = useMutation({
    mutationFn: (data: instructor) => updateUserInformation(data, user?._id!),
    onSuccess: (data: instructor) => {
      console.log("user updated : ", data);
      setDescValue("");
      setTags([]);
      setSkills([]);
      reset();
    },
  });
  useEffect(() => {
    if (user) {
      // Set the values using the keys of the Instructor interface
      (Object.keys(user) as Array<keyof instructor>).forEach((key) => {
        if (key in user) {
          setValue(key, user[key as keyof instructor] as string);
          /* setSkills([]) */
        /*   if (key === "skills") {
             setDescValue(user[key]);
            console.log(user);
          } */
        }
      });
    }
  }, [user, setValue]);

  const handleSkillsChange = (newSkill: tags[]) => {
    setSkills(newSkill);
    console.log(skills);

    setValue(
      "skills",
      newSkill.map((skill) => skill.text)
    );
  };
  const handleTagsChange = (newTags: tags[]) => {
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
    mutateUser(data);
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

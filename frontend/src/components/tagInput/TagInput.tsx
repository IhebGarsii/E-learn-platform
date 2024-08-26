import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { tags } from "../../types/tags";

type TagInputProps = {
  onChange: (updatedTags: tags[]) => void; // Corrected type
  tags: tags[];
};

function TagInput({ tags, onChange }: TagInputProps) {
  const [tag, setTag] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const newTag = tag.trim();

    if (key === "," || key === "Enter") {
      e.preventDefault();
      if (newTag && !tags.some((t) => t.text === newTag)) {
        const updatedTags = [...tags, { id: uuidv4(), text: newTag }];
        onChange(updatedTags);
      }
      setTag("");
    } else if (key === "Backspace" && !newTag.length && tags.length) {
      e.preventDefault();
      const updatedTags = tags.slice(0, -1);
      onChange(updatedTags);
      setTag(tags[tags.length - 1]?.text || "");
    }
  };

  const removeTag = (id: string) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    onChange(updatedTags);
  };

  return (
    <div className="p-2 flex gap-2 flex-wrap  border border-gray-50 px-4 py-2 rounded-lg shadow-sm border-2 border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400">
      {tags.map(({ id, text }) => (
        <div key={id} className="p-2 border gap-2 flex items-center">
          <span>{text}</span>
          <button
            className="text-white bg-red-700 w-6 h-[100%] flex items-center justify-center rounded"
            onClick={() => removeTag(id)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={tag}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </div>
  );
}

export default TagInput;

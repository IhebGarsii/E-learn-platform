import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UpdateUserPhoto } from "../../../api/userAPI";

function UpdatePhoto() {
  const [image, setImage] = useState<File | undefined>();
  const queryClient = useQueryClient();
  const { mutate: mutateUserPhoto } = useMutation({
    mutationFn: (image: File) =>
      UpdateUserPhoto(image, localStorage.getItem("idUser")!),
    onSuccess: () => {
      console.log("Image uploaded successfully");
      //problem hereeeeeeeeeeeeeeeeee
      queryClient.invalidateQueries({
        queryKey: ["user", localStorage.getItem("idUser")],
      });
    },
    onError: (error) => {
      console.error("Upload failed", error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const handleSubmit = () => {
    if (image) {
      mutateUserPhoto(image);
    } else {
      console.error("No image selected");
    }
  };

  return (
    <div className="relative  mb-20  w-full flex flex-col items-center gap-5 justify-center min-w-[200px]  ">
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className=" md:w-40 w-28 md:h-40 h-28 max-w-xs rounded-full"
        />
      )}
      <input
        type="file"
        onChange={handleFileChange}
        className="peer h-full w-full rounded-md border-2 border-gray-400 ..."
      />
      <label className="...">Image</label>
      <button onClick={() => handleSubmit()}>submit</button>
    </div>
  );
}

export default UpdatePhoto;

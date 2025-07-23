import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UpdateUserPhoto } from "../../../api/userAPI";
import defaultImage from "../../../../public/defaultPfroile.png";
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
    <div className="relative border border-gray-500  p-2 rounded mb-20  w-full flex flex-col items-center gap-5 justify-center min-w-[200px]  ">
      <h1 className="text-xl font-bold">Photo</h1>
      <h1 className="text-center">Add a nice photo of yourself for your profile.</h1>
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className=" md:w-40 w-28 md:h-40 h-28 max-w-xs rounded-full"
        />
      ) : (
        <img
          src={defaultImage}
          className=" md:w-40 w-28 md:h-40 h-28 max-w-xs rounded-full"
        />
      )}
      <label htmlFor="">Add / Change Image</label>
      <div className="w-full flex gap-2 justify-center items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className=" w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 md:w-[60%] file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
        />
        <button
          className="p-2 flex justify-center items-center rounded-md border border-blue-300 bg-white text-sm text-gray-900"
          onClick={() => handleSubmit()}
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default UpdatePhoto;

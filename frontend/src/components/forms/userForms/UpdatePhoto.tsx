import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UpdateUserPhoto } from "../../../api/userAPI";

function UpdatePhoto() {
  const [image, setImage] = useState<File | undefined>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (image: File) =>
      UpdateUserPhoto(image, localStorage.getItem("idUser")!),
    onSuccess: () => {
      console.log("Image uploaded successfully");
      //problem hereeeeeeeeeeeeeeeeee
      queryClient.invalidateQueries(["user", localStorage.getItem("idUser")!]);
    },
    onError: (error) => {
      console.error("Upload failed", error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      mutation.mutate(file);
    }
  };

  return (
    <div className="relative h-11 w-full min-w-[200px]">
      <input
        type="file"
        onChange={handleFileChange}
        className="peer h-full w-full rounded-md border-2 border-gray-400 ..."
      />
      <label className="...">Image</label>
      <button>submit</button>
    </div>
  );
}

export default UpdatePhoto;

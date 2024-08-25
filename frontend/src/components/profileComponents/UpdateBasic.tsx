import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { instructor } from "../../types/instructor";
import UserForms from "../forms/userForms/UserForms";
import { updateUser } from "../../api/userAPI";
type signupData = {
  token: string;
  user: instructor;
};
function UpdateBasic() {
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateUser(formData),
    onSuccess: (data: signupData) => {
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("idUser", data.user._id);
      localStorage.setItem("firstName", data.user.firstName);
      localStorage.setItem("lastName", data.user.lastName);
      localStorage.setItem("profileImage", data.user.image);
      localStorage.setItem("roles", JSON.stringify(data.user.roles));
    },
    onError: (error: Error) => {
      console.error("Signup failed:", error);
      toast.error(`Signup failed: ${error || "Unknown error"}`);
    },
  });
  const onSubmit = (data: instructor) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("_id", localStorage.getItem("idUser")!);
    formData.append("password", data.password);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("image", data.image[0]);
    mutate(formData);
  };

  return (
    <div className="w-full md:w-fit mx-auto            ">
      <UserForms update={true} onSubmit={onSubmit} isPending={isPending} />
    </div>
  );
}

export default UpdateBasic;

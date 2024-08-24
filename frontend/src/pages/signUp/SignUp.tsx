import { signup } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { instructor } from "../../types/instructor";
import toast from "react-hot-toast";
import UserForms from "../../components/forms/userForms/UserForms";
type signupData = {
  token: string;
  newUser: instructor;
};
function SignUp() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => signup(formData),
    onSuccess: (data: signupData) => {
      console.log(data);  

      localStorage.setItem("token", data.token);
      localStorage.setItem("idUser", data.newUser._id);
      localStorage.setItem("firstName", data.newUser.firstName);
      localStorage.setItem("lastName", data.newUser.lastName);
      localStorage.setItem("profileImage", data.newUser.image);
      localStorage.setItem("roles", JSON.stringify(data.newUser.roles));
      navigate("/home");
    },
    onError: (error: Error) => {
      console.error("Signup failed:", error);
      toast.error(`Signup failed: ${error || "Unknown error"}`);
    },
  });
  const onSubmit = (data: instructor) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("image", data.image[0]);
    mutate(formData);
  };

  return <UserForms onSubmit={onSubmit} isPending={isPending} />;
}

export default SignUp;

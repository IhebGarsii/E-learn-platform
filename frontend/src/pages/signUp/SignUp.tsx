import { signup } from "../../api/userAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { instructor } from "../../types/instructor";
import toast from "react-hot-toast";
import UserForms from "../../components/forms/userForms/UserForms";
import { useUserState } from "../../state/user";
type signupData = {
  token: string;
  newUser: instructor;
};
function SignUp() {
  const navigate = useNavigate();
  const { role } = useParams();
  const { setData } = useUserState();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => signup(formData),
    onSuccess: (data: signupData) => {
      console.log(data);
      setData(data.newUser);
      localStorage.setItem("token", data.token);
      localStorage.setItem("idUser", data.newUser._id);
      localStorage.setItem("firstName", data.newUser.firstName);
      localStorage.setItem("lastName", data.newUser.lastName);
      localStorage.setItem("profileImage", data.newUser.image);
      localStorage.setItem("roles", data.newUser.role);
      navigate("/Courses");
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
    formData.append("role", role!);
    mutate(formData);
  };

  return (
    <div className="mt-8 h-screen w-full flex items-center justify-center bg-[url('././assets/auth.jpg')] bg-cover bg-no-repeat">
      <UserForms onSubmit={onSubmit} isPending={isPending} />;
    </div>
  );
}

export default SignUp;

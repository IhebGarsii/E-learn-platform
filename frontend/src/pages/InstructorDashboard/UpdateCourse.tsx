import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CourseForm from "../../components/forms/courseForms/CourseForm";
import { cousers } from "../../types/course";
import { getCourse, updateCourse } from "../../api/coursesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import UpdateVideo from "../../components/videoUpload/UpdateVideo";
import toast from "react-hot-toast";

function UpdateCourse() {
  const { idCourse } = useParams();
  const queryClient = useQueryClient();
  const [decpription, setDecpription] = useState("");
  const navigate = useNavigate();
  const handleDecriptionChange = (NewDecpription: string) => {
    setDecpription(NewDecpription);
  };
  const { mutate: mutateUpdate } = useMutation({
    mutationFn: (formData: FormData) =>
      updateCourse(formData, localStorage.getItem("idUser")!, idCourse!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["course", idCourse],
      });
      toast.success('The Course Has Been Uppdated')
      navigate(`/course/${idCourse}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const submitCourse = async (data: cousers) => {
    console.log(data, "update course");

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof cousers];
      if (Array.isArray(value) && value.length === 0) {
        console.log(`${key} is an empty array, skipping...`);
      } else if (key === "video") {
      } else {
        if (value) {
          console.log(key, "=====>", value);

          formData.append(key, value as any); // Use any here to satisfy TypeScript
        }
      }
    });

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    console.log(formData.getAll("description"), "form data");

    mutateUpdate(formData);
  };

  const { data: course } = useQuery({
    queryKey: ["course", idCourse],
    queryFn: () => getCourse(idCourse!),
  });
  return (
    <div>
      {course ? ( // Render CourseForm only when the course is available
        <>
          <CourseForm
            handleDecriptionChange={handleDecriptionChange}
            submitCourse={submitCourse}
            update={true}
            course={course}
          />
          <UpdateVideo />
        </>
      ) : (
        <p>Loading course data...</p>
      )}
    </div>
  );
}

export default UpdateCourse;

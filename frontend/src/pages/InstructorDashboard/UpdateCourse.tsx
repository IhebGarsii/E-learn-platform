import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import CourseForm from "../../components/forms/courseForms/CourseForm";
import { cousers } from "../../types/course";
import { updateCourse } from "../../api/coursesAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UpdateCourse() {
  const { idCourse } = useParams();
  const queryClient = useQueryClient();
  const [decpription, setDecpription] = useState("");
  const [course, setCourse] = useState<cousers>();

  const handleDecriptionChange = (NewDecpription: string) => {
    setDecpription(NewDecpription);
  };
  const { mutate: mutateUpdate } = useMutation({
    mutationFn: (formData: FormData) =>
      updateCourse(formData, localStorage.getItem("idUser")!, idCourse!),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const submitCourse = async (data: cousers) => {
    console.log(data, "update course");

    const formData = new FormData();
    formData.append("description", decpription);

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

    /*  if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    } */

    console.log(formData.getAll("price"));

    mutateUpdate(formData);
  };

  useEffect(() => {
    setCourse(queryClient.getQueryData(["course", idCourse]));

    if (course) {
      console.log("Course found in cache:", course);
    } else {
      console.log("Course not found in cache, fetching...");
    }
  });

  return (
    <div>
      {course ? ( // Render CourseForm only when the course is available
        <CourseForm
          handleDecriptionChange={handleDecriptionChange}
          submitCourse={submitCourse}
          update
          course={course}
        />
      ) : (
        <p>Loading course data...</p>
      )}
    </div>
  );
}

export default UpdateCourse;

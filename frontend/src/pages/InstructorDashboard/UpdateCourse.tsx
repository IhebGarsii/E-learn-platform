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
    const formData = new FormData();
    formData.append("description", decpription);

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof cousers];
      if (value) {
        formData.append(key, value as any); // Use any here to satisfy TypeScript
      }
    });

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    if (data.tags) {
      data.tags.forEach((tag) => formData.append("tags", tag));
    }

    if (data.headTags) {
      data.headTags.forEach((tag) => formData.append("headTags", tag));
    }

    if (data.learnTarget) {
      data.learnTarget.forEach((tag) => formData.append("learnTarget", tag));
    }

    formData.append("instructorId", localStorage.getItem("idUser")!);

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
      <CourseForm
        handleDecriptionChange={handleDecriptionChange}
        submitCourse={submitCourse}
        update
        course={course}
      />
    </div>
  );
}

export default UpdateCourse;

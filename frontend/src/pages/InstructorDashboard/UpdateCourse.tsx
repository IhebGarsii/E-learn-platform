import { useMutation, useQueries } from "@tanstack/react-query";
import CourseForm from "../../components/forms/courseForms/CourseForm";
import { cousers } from "../../types/course";
import { updateCourse } from "../../api/coursesAPI";
import { useParams } from "react-router-dom";
import { useState } from "react";

function UpdateCourse() {
  const [decpription, setDecpription] = useState("");

  const handleDecriptionChange = (NewDecpription: string) => {
    setDecpription(NewDecpription);
  };
  const { idCourse } = useParams();
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
  return (
    <div>
      <CourseForm
        handleDecriptionChange={handleDecriptionChange}
        submitCourse={submitCourse}
        update
      />
    </div>
  );
}

export default UpdateCourse;

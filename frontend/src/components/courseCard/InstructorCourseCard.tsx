import React from "react";
import { cousers } from "../../types/course";

type InstructorCourseCardProp = {
  course: cousers;
};
function InstructorCourseCard({ course }: InstructorCourseCardProp) {
  return (
    <div>
      <img
      className=""
        src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
        width={70}
        height={70}

        alt=""
      />
    </div>
  );
}

export default InstructorCourseCard;

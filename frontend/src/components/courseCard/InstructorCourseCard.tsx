import React from "react";
import { cousers } from "../../types/course";

type InstructorCourseCardProp = {
  course: cousers;
};
function InstructorCourseCard({ course }: InstructorCourseCardProp) {
  return (
    <div className="flex flex-coll gap-10">
      <img
        className=" rounded object-cover"
        src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
        width={80}
        height={50}
        alt=""
      />
      <h1> {course.title} </h1>
    </div>
  );
}

export default InstructorCourseCard;

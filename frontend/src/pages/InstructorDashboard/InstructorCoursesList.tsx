import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInstructorCourses } from "../../api/coursesAPI";
import Skeleton from "react-loading-skeleton";
import { cousers } from "../../types/course";
import InstructorCourseCard from "../../components/courseCard/InstructorCourseCard";

function InstructorCoursesList() {
  const {
    data: courses,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["instructorCourses"],
    queryFn: () => getInstructorCourses(localStorage.getItem("idUser")!),
  });
  console.log(courses);

  if (isError) {
    return <>error</>;
  }
  if (isPending) {
    return <Skeleton count={5} />;
  }
  return (
    <div className="flex flex-col gap-4 mt-16 p-4">
      <h1>My Courses</h1>
      {courses?.map((course: cousers) => (
        <InstructorCourseCard course={course} />
      ))}
    </div>
  );
}

export default InstructorCoursesList;

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
    <div>
      {courses?.map((course: cousers) => (
        <InstructorCourseCard course={course} />
      ))}
    </div>
  );
}

export default InstructorCoursesList;

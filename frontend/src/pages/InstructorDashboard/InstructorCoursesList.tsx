import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInstructorCourses } from "../../api/coursesAPI";
import Skeleton from "react-loading-skeleton";
import { cousers } from "../../types/course";
import InstructorCourseCard from "../../components/courseCard/InstructorCourseCard";
import { Link } from "react-router-dom";

function InstructorCoursesList() {
  const userId = localStorage.getItem("idUser");
  const {
    data: courses,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["instructorCourses"],
    queryFn: () => getInstructorCourses(userId!),
    enabled: !!userId,
  });
  console.log(courses);

  if (isError) {
    return <>error</>;
  }
  if (isPending) {
    return (
      <div className="flex flex-col gap-4 mt-16 p-4">
        <Skeleton count={5} height={100} />
      </div>
    );
  }
  console.log("coursssssssssssssses", courses);

  if (!Array.isArray(courses)) {
    return (
      <div className="flex flex-col gap-4 h-screen justify-center items-center ">
        <h1>No courses found</h1>
        <Link className="hover:text-blue-500" to={`/addProject`}>
          Why don't you start Now!
        </Link>
      </div>
    );
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

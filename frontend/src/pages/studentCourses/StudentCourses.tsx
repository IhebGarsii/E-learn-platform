import { useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { cousers } from "../../types/course";
import InstructorCourseCard from "../../components/courseCard/InstructorCourseCard";
import { Link } from "react-router-dom";
import { getStudentCourses } from "../../api/userAPI";

function StudentCourses() {
  const userId = localStorage.getItem("idUser");
  const {
    data: courses,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["studentCourses", [userId]],
    queryFn: () => getStudentCourses(userId!),
    enabled: !!userId,
  });
  console.log(courses, "student courses");

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

  if (!Array.isArray(courses)) {
    return (
      <div className="flex flex-col gap-4 h-screen justify-center items-center ">
        <h1>No courses found</h1>
        <Link className="hover:text-blue-500" to={`/courses`}>
          Buy Now!
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 items-center  mt-16 p-4 lg:text-base">
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <h1>My Courses</h1>
        {courses?.map((course: cousers) => (
          <InstructorCourseCard student={true} course={course} />
        ))}
      </div>
    </div>
  );
}

export default StudentCourses;

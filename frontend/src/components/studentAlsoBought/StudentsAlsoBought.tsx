import { useQuery } from "@tanstack/react-query";
import { studentAlsoBought } from "../../api/coursesAPI";
import { cousers } from "../../types/course";

type StudentsAlsoBoughtProps = {
  category: string;
};
type recemondedCoursesType = {
  courseId: cousers;
};
function StudentsAlsoBought({ category }: StudentsAlsoBoughtProps) {
  const { data: recemondedCourses } = useQuery({
    queryKey: ["RecemondedCourses"],
    queryFn: () => studentAlsoBought(category!),
  });
  console.log("coursssssssssssssssses", recemondedCourses);

  return (
    <div>
      {recemondedCourses?.courseArrayNumber?.map(
        (course: recemondedCoursesType) => (
          <>
            <h1>{course.courseId.secondTitle}</h1>
            
            <h1>{course.courseId.title}</h1>
          </>
        )
      )}
    </div>
  );
}

export default StudentsAlsoBought;

import { useQuery } from "@tanstack/react-query";
import { studentAlsoBought } from "../../api/coursesAPI";
import { cousers } from "../../types/course";

type StudentsAlsoBoughtProps = {
  category: string;
};

function StudentsAlsoBought({ category }: StudentsAlsoBoughtProps) {
  const { data: recemondedCourses } = useQuery({
    queryKey: ["RecemondedCourses"],
    queryFn: () => studentAlsoBought(category!),
  });
  console.log("courses", recemondedCourses);

  return (
    <div>
      {recemondedCourses?.map((course: cousers) => (
        <>
          <h1>{course.title}</h1>
          <h1>dddddddddddddddddddddddddddddd</h1>
        </>
      ))}
    </div>
  );
}

export default StudentsAlsoBought;

import { useQuery } from "@tanstack/react-query";
import { studentAlsoBought } from "../../api/coursesAPI";
import { cousers } from "../../types/course";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

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
          <div className=" mb-4 text-xs font-semibold p-3 ">
            <div className="flex aline-center gap-3">
              <img
                className="w-14 h-14 b-rounded  "
                src={`http://localhost:4000/uploads/courses/${course.courseId.thumbnail}`}
                alt=""
              />
              <div>
                <Link to={`/Course/${course.courseId._id}`}>
                  {course.courseId.title}
                </Link>

                <h1 className="text-gray-500">
                  {course.courseId.studentsId.length} students
                </h1>
                <div className="flex items-center gap-2 text-gray-500 mt-2">
                  <span className="text-gray-500">
                    {course.courseId.avgRate.nbRate}
                  </span>
                  <Rating
                    className="text-xs"
                    style={{ maxWidth: 200, width: 60 }}
                    value={course.courseId.avgRate.rate}
                    readOnly
                  />
                  <span className="whitespace-nowrap text-gray-500">
                    ({course.courseId.avgRate.nbRate} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-500">
                    {" "}
                    {course.courseId.videoDuration} total hours
                  </span>
                  <span className="text-gray-500">
                    {" "}
                    {course.courseId.difficultyLevel}{" "}
                    {course.courseId.timeAccess}
                  </span>
                </div>
                <h1 className="text-2xl font-bold mt-2">
                ${course.courseId.price}

                </h1>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default StudentsAlsoBought;

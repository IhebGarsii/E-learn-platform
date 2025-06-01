import { Link } from "react-router-dom";
import { cousers } from "../../types/course";
type publicProfileCourseCardProps = {
  course: cousers;
};
function publicProfileCourseCard({course}: publicProfileCourseCardProps) {
  return (
    <div key={course._id}>
      <div className="flex  border border-gray-400 my-2 p-1 rounded-md relative ">
        <img
          className="w-20 h-20 md:w-40 md:h-40 rounded-md mb-2"
          src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
          alt=""
        />

        <div className="flex flex-col justify-around ml-2">
          <Link
            to={`/Course/${course._id}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150"
          >
            {course.title}
          </Link>
          <div className="flex flex-col ">
            <nav className="flex  ">
              {course.headTags.map((tag, key) => (
                <span
                  key={key}
                  className="border-2 border-gray-900 rounded-xl w-fit p-1 m-1"
                >
                  {tag}
                </span>
              ))}
            </nav>
            <nav className="flex ">
              {course.tags.map((tag, key) => (
                <span
                  key={key}
                  className="border-2 border-gray-900 rounded-xl w-fit p-1 m-1"
                >
                  {tag}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default publicProfileCourseCard;

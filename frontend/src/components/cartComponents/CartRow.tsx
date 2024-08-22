import { Link } from "react-router-dom";
import { cousers } from "../../types/course";
import { Rating } from "@smastrom/react-rating";

type cartRowProps = {
  course: cousers;
  onRemove: (idCourse: string) => void;
};
function CartRow({ course, onRemove }: cartRowProps) {
  return (
    <section key={course._id} className="grid lg:grid-cols-3 border-b-2">
      <main className="flex">
        <div className="flex gap-3 ">
          <Link to={`/course/${course._id}`}>
            <img
              className="min-w-24  h-16 lg:w-40 lg:h-24"
              src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
              alt=""
            />
          </Link>
          <div className="">
            <h1 className="text-lg font-semibold lg:text-xl lg:font-bold ">
              {course.title}
            </h1>
            {typeof course.instructorId !== "string" && (
              <Link
                className=" text-blue-500 text-sm"
                to={`/instructor/${course.instructorId?._id}`}
              >
                By {course.instructorId?.firstName}
                {course.instructorId?.lastName}
              </Link>
            )}

            <div className="flex gap-1 items-center">
              <span className="font-bold">{course.avgRate.rate}</span>
              <Rating
                className="text-xs"
                style={{ maxWidth: 250, width: 80 }}
                value={course.avgRate.rate}
                readOnly
              />
              <span className="whitespace-nowrap font-light text-sm">
                ({course.avgRate.nbRate} ratings)
              </span>
            </div>
            <ul className="flex space-x-2 text-xs font-light">
              <li className="whitespace-nowrap">
                {course.duration} Total Hours
              </li>
              <li className="whitespace-nowrap">
                {course.articles} Total Articles
              </li>
              <li className="whitespace-nowrap">
                {/*  {course.difficulty} Difficulty Level */}
              </li>
            </ul>
          </div>
        </div>
        <div className="font-black text-blue-900 text-xl">${course.price}</div>
      </main>
      <div className="flex gap-3 ">
        <button
          onClick={() => onRemove(course._id)}
          className="bg-red-500  hover:bg-red-700 text-white font-semibold text-sm py-1 px-2 rounded"
        >
          Remove
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-2 rounded">
          Buy Now
        </button>
      </div>
    </section>
  );
}

export default CartRow;

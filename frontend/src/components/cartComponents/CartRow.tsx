import { Link } from "react-router-dom";
import { cousers } from "../../types/course";
import { Rating } from "@smastrom/react-rating";

type cartRowProps = {
  course: cousers;
  onRemove: (idCourse: string) => void;
};
function CartRow({ course, onRemove }: cartRowProps) {
  return (
    <section
      key={course._id}
      className="flex flex-wrap w-full py-4  mx-auto  border-b-2 lg:justify-between"
    >
      <main className="flex justify-between lg:-w-full  ">
        <div className="flex gap-2  ">
          <Link to={`/course/${course._id}`}>
            <img
              className="min-w-16  h-14 lg:w-40 lg:h-24"
              src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
              alt=""
            />
          </Link>
          <div className="">
            <h1 className="text-sm font-bold w-[95%] md:w-fit lg:text-xl lg:font-bold ">
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
            <nav className="flex w-full bg-red-200 justify-between md:justify-start md:gap-3">
              <h2 className="whitespace-nowrap text-xs">
                {course.duration} Total Hours
              </h2>
           
              <h2 className="whitespace-nowrap text-xs">
                {course.difficultyLevel} Difficulty Level
              </h2>
            </nav>
          </div>
        </div>
        <div className="font-black text-blue-900 text-md ">
          ${course.price}
        </div>
      </main>
      <div className="flex gap-3 lg:flex-col ">
        <button
          onClick={() => onRemove(course._id)}
          className="bg-red-500  hover:bg-red-700 text-white font-semibold text-sm py-1 px-2 rounded lg:h-10"
        >
          Remove
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-2 rounded lg:h-10">
          Buy Now
        </button>
      </div>
    </section>
  );
}

export default CartRow;

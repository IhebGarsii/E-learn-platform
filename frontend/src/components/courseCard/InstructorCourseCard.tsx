import { cousers } from "../../types/course";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCourse } from "../../api/coursesAPI";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useStore } from "../../hooks/zustand";

type InstructorCourseCardProp = {
  course: cousers;
};
function InstructorCourseCard({ course }: InstructorCourseCardProp) {
  const queryClient = useQueryClient();
  const setTag = useStore((state) => state.setTagSearch);
  const navigate = useNavigate();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (course: cousers) =>
      DeleteCourse(localStorage.getItem("idUser")!, course._id),
    onSuccess: (data) => {
      console.log(data, "ererere");
      queryClient.invalidateQueries({
        queryKey: ["instructorCourses"],
      });
      toast.success("Successfully Deleted and Yeted!");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDelete = (course: cousers) => {
    mutateDelete(course);
  };
  const searchTag = (tag: string) => {
    setTag(tag);
    navigate("/courses");
  };
  return (
    <div className="flex flex-coll items-center justify-between bg-gray-100 gap-2 text-xs lg:text-sm lg:px-10  lg:h-40">
      <div className="flex items-center gap-2 max-w-70  p-2">
        <img
          className=" rounded object-cover"
          src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
          width={80}
          height={50}
          alt=""
        />
        <div className=" flex flex-col gap-2">
          <Link
            to={`/Course/${course._id}`}
            className="hover:text-blue-500 w-[50%] cursor-pointer "
          >
            {course.title}
          </Link>
          <div>
            {course.tags.map((tag, i) => (
              <span
                onClick={() => searchTag(tag)}
                className="p-1 cursor-pointer hover:text-blue-500 "
                key={i}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <nav>
        <span> {course.studentsId.length} </span>
      </nav>
      <div className="flex flex-col">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleDelete(course)}
        >
          <MdDelete />
        </button>
        <Link
          to={`/updateCourse/${course._id}`}
          className="bg-blue-600 text-white px-4 py-2 justify-center rounded"
        >
          <FaRegEdit />
        </Link>
      </div>
    </div>
  );
}

export default InstructorCourseCard;

import { cousers } from "../../types/course";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCourse } from "../../api/coursesAPI";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";

type InstructorCourseCardProp = {
  course: cousers;
};
function InstructorCourseCard({ course }: InstructorCourseCardProp) {
  const isInstructor = localStorage.getItem("roles") == "instructor";
  const queryClient = useQueryClient();
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
  return (
    <div className="flex flex-coll gap-2 text-xs">
      <img
        className=" rounded object-cover"
        src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
        width={80}
        height={50}
        alt=""
      />
      <Link
        to={`/Course/${course._id}`}
        className="hover:text-blue-500 w-[50%] cursor-pointer"
      >
        {course.title}
      </Link>
      {isInstructor && (
        <div className="flex justify-between items-center gap-4 mt-10">
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
      )}
    </div>
  );
}

export default InstructorCourseCard;

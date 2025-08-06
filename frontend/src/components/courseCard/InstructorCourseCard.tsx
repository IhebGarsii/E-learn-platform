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
  student: boolean;
};

function InstructorCourseCard({ course, student }: InstructorCourseCardProp) {
  const queryClient = useQueryClient();
  const setTag = useStore((state) => state.setTagSearch);
  const navigate = useNavigate();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (course: cousers) =>
      DeleteCourse(localStorage.getItem("idUser")!, course._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructorCourses"] });
      toast.success("Course deleted successfully!");
    },
    onError: (error) => {
      console.error(error);
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg shadow p-4 mb-4 gap-4 transition hover:shadow-lg">
      {/* Image and Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
        <img
          src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
          alt="Course Thumbnail"
          className="w-full sm:w-24 h-32 sm:h-20 object-cover rounded"
        />

        <div className="flex flex-col gap-2 overflow-hidden w-full">
          <Link
            to={`/Course/${course._id}`}
            className="text-base font-semibold text-gray-800 hover:text-blue-600 truncate"
          >
            {course.title}
          </Link>

          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag, i) => (
              <span
                key={i}
                onClick={() => searchTag(tag)}
                className="text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Students Count */}
      <div className="flex justify-between sm:justify-start sm:items-center gap-4 text-sm text-gray-600 sm:w-auto">
        <span>{course.studentsId.length} students</span>
      </div>

      {/* Action Buttons */}
      {!student && (
        <div className="flex gap-2 justify-end sm:flex-col">
          <button
            onClick={() => handleDelete(course)}
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 rounded transition w-10 h-10"
            title="Delete"
          >
            <MdDelete size={18} />
          </button>
          <Link
            to={`/updateCourse/${course._id}`}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition w-10 h-10"
            title="Edit"
          >
            <FaRegEdit size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default InstructorCourseCard;

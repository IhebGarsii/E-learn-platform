import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../hooks/zustand";
import { addStudentToCourse } from "../../api/coursesAPI";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const boughtCourses = useStore((state) => state.boughtCourses);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutateAddingstudent } = useMutation({
    mutationFn: () =>
      addStudentToCourse(boughtCourses, localStorage.getItem("idUser")!),
    onSuccess: (data) => {
      console.log("Students added to course successfully", data);
      queryClient.invalidateQueries({ queryKey: ["courses", boughtCourses] });

      queryClient.invalidateQueries({
        queryKey: ["user", localStorage.getItem("idUser")!],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart", localStorage.getItem("idUser")],
      });
      setTimeout(() => {
        if (boughtCourses.length > 1) {
          navigate(`/studentCourseList/${localStorage.getItem("idUser")}`);
        } else {
          navigate(`/Course/${localStorage.getItem("CourseId")}`);
        }
      }, 4000);
    },
    onError: (error) => {
      console.error("Error adding students to course:", error);
    },
  });

  useEffect(() => {
    if (boughtCourses.length && localStorage.getItem("idUser")!) {
      mutateAddingstudent();
    }
  }, [boughtCourses, localStorage.getItem("idUser")!, mutateAddingstudent]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-2xl p-12 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold text-green-600">
          Payment Successful!
        </h1>

        <p className="mb-8 text-xl text-gray-700">
          Thank you for your purchase.
        </p>

        <div className="pt-8 mt-8 border-t border-gray-100">
          <p className="text-lg text-gray-700">
            Have questions? Contact us at:
          </p>
          <a
            href="mailto:admin@eliteai.tools"
            className="inline-block mt-2 text-xl font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            admin@eliteai.tools
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;

import { Link } from "react-router-dom";
import { useStore } from "../../hooks/zustand";
import { useEffect, useState } from "react";

function PaymentFailure() {
  const [courseId, setCourseId] = useState("");
  useEffect(() => {
    setCourseId(localStorage.getItem("CourseId") || "");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-2xl p-12 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold text-red-600">
          Your payment request has failed
        </h1>

        <Link
          to={`/course/${courseId}`}
          className="mb-8 hover:text-blue-600  text-xl text-gray-700"
        >
          Go back to the course page and try again.
        </Link>

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

export default PaymentFailure;

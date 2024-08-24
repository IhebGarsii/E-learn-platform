import { Link } from "react-router-dom";
import { cousers } from "../../types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../api/cartAPI";
import { useCartState } from "../../state/cart";
type courseCardProps = {
  course: cousers;
};
function CourseCard({ course }: courseCardProps) {
  if (!course._id) {
    return <div>No course data available</div>;
  }
  const queryClient = useQueryClient();
  const { setData } = useCartState();
  // Ensure avgRate and avgRate.rate are valid numbers
  const rate = course.avgRate?.rate || 0;
  const formattedRate = typeof rate === "number" ? rate.toFixed(1) : "0.0";

  // Calculate the number of filled stars
  const numFilledStars = Math.round(rate);
  const { mutate: mutateCart } = useMutation({
    mutationFn: (data: string) =>
      addToCart(data, localStorage.getItem("idUser")!),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      /* queryClient.invalidateQueries({ queryKey: ["cart"] }); */
      setData(data);
    },
  });
  const handleAddToCart = () => {
    if (course) {
      mutateCart(course._id);
    }
  };
  return (
    <div className="w-full   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link className="rounded-md" to={`/Course/${course._id}`}>
        <img
          className="p-2  w-[100%] rounded-xl    "
          src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
          alt="Course thumbnail"
        />
      </Link>
      <div className="px-5 pb-5 ">
        <Link to="/detail">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {/* Add the course title or name here */}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < numFilledStars
                    ? "text-yellow-300"
                    : "text-gray-200 dark:text-gray-600"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {formattedRate}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {course.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

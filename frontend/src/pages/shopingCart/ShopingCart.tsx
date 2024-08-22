import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartState } from "../../state/cart";
import { removeFromCart } from "../../api/cartAPI";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
function ShopingCart() {
  const { data: cart, setData } = useCartState();
  const { mutate: mutateRemove } = useMutation({
    mutationFn: (idCourse: string) => removeFromCart(idCourse, cart?._id!),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setData(data);
    },
  });
  console.log("shoping", cart);

  const handleRemove = (idCourse: string) => {
    if (cart) {
      mutateRemove(idCourse);
    }
  };

  return (
    <div className="mt-12 w-[90%] mx-auto flex  shadow-md flex-col gap-7 ">
      <h1 className="text-center p-3 text-xl lg:text-3xl font-bold">
        You Have {cart?.quantity} Items In Your Cart
      </h1>
      {cart?.courses?.map((course) => (
        <section key={course._id} className="grid lg:grid-cols-3 border-b-2">
          <div className="flex gap-3 ">
            <Link to={`/course/${course._id}`}>
              <img
                className="w-20  h-16 lg:w-40 lg:h-24"
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
            <div className="font-black text-blue-900 text-xl">
              ${course.price}
            </div>
          </div>
          <div className="flex gap-3 mx-auto">
            <button
              onClick={() => handleRemove(course._id)}
              className="bg-red-500  hover:bg-red-700 text-white font-semibold text-sm py-1 px-2 rounded"
            >
              Remove
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-2 rounded">
              Buy Now
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

export default ShopingCart;

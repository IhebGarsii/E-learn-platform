import { Link } from "react-router-dom";
import { cartSaved } from "../../types/cart";
import { useUserState } from "../../state/user";

type smallCartProp = {
  cart: cartSaved;
};

function SmallCart({ cart }: smallCartProp) {
  const { data: user } = useUserState();
  if (!cart) {
    return <div className="mt-20">your cart is empty</div>;
  }
  return (
    <>
      <div className="h-80 w-80 bg-white overflow-y-scroll overflow-x-hidden p-3 border-gray border ">
        {cart?.courses?.map((course) => (
          <Link
            to={`/course/${course._id}`}
            key={course._id}
            className="flex items-center py-2 gap-3 border-b-2 border-gray-500 "
          >
            <img
              className="w-28 h-16 mt-3"
              src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold overfolw-hidden">
                {course.title}
              </span>
              {typeof course.instructorId !== "string" && (
                <span className="text-sm text-gray-400 font-light">
                  {course.instructorId?.firstName}{" "}
                  {course.instructorId?.lastName}
                </span>
              )}
              <span className="font-bold text-lg "> {course.price} $ </span>
            </div>
          </Link>
        ))}
      </div>
      <div className=" absolute top-full right-0 h-16 flex items-center p-5 justify-between  w-full bg-white border shadow-2xl ">
        <h1 className=" px-5  font-semibold text-xl">
          total: {cart?.totalPrice}$
        </h1>
        <Link
          to={`cart/${cart.idUser}`}
          className="cursor-pointer hover:text-blue-500 hover:font-bold "
        >
          View Cart
        </Link>
      </div>
    </>
  );
}

export default SmallCart;

import { cartSaved } from "../../types/cart";

type smallCartProp = {
  cart: cartSaved;
};

function SmallCart({ cart }: smallCartProp) {
  return (
    <>
      <div className="h-80 w-80 bg-white overflow-y-scroll overflow-x-hidden p-5 border-gray border ">
        {cart?.courses.map((course) => (
          <div
            key={course._id}
            className="flex items-center py-3 gap-3 border-b-2 border-gray-500 "
          >
            <img
              className="w-18 h-16"
              src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold overfolw-hidden">
                {" "}
                {course.title}{" "}
              </span>
              <span className="text-sm text-gray-400 font-light">
                {course.instructorId.firstName} {course.instructorId.lastName}
              </span>
              <span className="font-bold text-lg "> {course.price} $ </span>
            </div>
          </div>
        ))}
      </div>
      <div className=" absolute top-80 right-36 h-16 flex items-center p-5  w-72 bg-white border-2 ">
        <h1 className="  font-semibold text-xl">total: {cart?.totalPrice}$ </h1>
      </div>
    </>
  );
}

export default SmallCart;

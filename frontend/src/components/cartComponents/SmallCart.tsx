import { cartSaved } from "../../types/cart";

type smallCartProp = {
  cart: cartSaved;
};

function SmallCart({ cart }: smallCartProp) {
  return (
    <div className="max-h-48 w-80 bg-white overflow-y-scroll snap-none absolute top-16 right-48">
      {cart?.courses.map((course) => (
        <div key={course._id}>
          <img
            className="w-18 h-16"
            src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
            alt=""
          />
          <div className="">
            <span> {course.title} </span>
            <span> {course.instructorId.firstName} </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SmallCart;

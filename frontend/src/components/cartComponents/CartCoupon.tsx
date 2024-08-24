import { useEffect, useState } from "react";
import { useCartState } from "../../state/cart";

function CartCoupon() {
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const { data: cart, setData } = useCartState();
  useEffect(() => {
    const fetchCoupon = async () => {
      const res = await fetch(
        `http://localhost:4000/coupon/getCoupon/${coupon}`
      );
      const data = await res.json();
      setCouponDiscount(data.discount);
    };
    fetchCoupon();
  }, [coupon]);
  const handleCoupon = () => {
    if (cart) {
      const updatedCourse = cart.courses.map((course) => ({
        ...course,
        price: course.price * couponDiscount,
      }));
      setData({ courses: updatedCourse });
    }
  };
  return (
    <div className="">
      <input
        type="text"
        className="p-2"
        placeholder="coupon"
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button
        onClick={() => handleCoupon()}
        className="bg-dark-purple p-2 font-bold text-white"
      >
        Apply
      </button>
    </div>
  );
}

export default CartCoupon;

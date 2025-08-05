import { useEffect, useState } from "react";
import { useCartState } from "../../state/cart";
import { useMutation } from "@tanstack/react-query";
import { coursePayment } from "../../api/coursesAPI";
import { Products } from "../../types/products";
import { cart, cartSaved } from "../../types/cart";
type CartCouponProps = {
  cart: cartSaved | undefined;
};
function CartCoupon({ cart }: CartCouponProps) {
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  /* useEffect(() => {
    const fetchCoupon = async () => {
      const res = await fetch(
        `http://localhost:4000/coupon/getCoupon/${coupon}`
      );
      const data = await res.json();
      setCouponDiscount(data.discount);
    };
    fetchCoupon();
  }, [coupon]); */
  let totalPrice = cart?.totalPrice;
  /* const handleCoupon = () => {
    if (cart) {
      const updatedCourse = cart.courses.map((course) => ({
        ...course,
        price: course.price * couponDiscount,
      }));
      setData({ courses: updatedCourse });
    }
  }; */

  const { mutate: paymentMutate } = useMutation({
    mutationFn: (products: Products[]) => coursePayment(products),
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.log("Payment error", error);
    },
  });

  const handlePayment = () => {

    const products: Products[] = (cart?.courses ?? []).map((course) => ({
      title: course.title,
      quantity: 1,
      price: course.price,
    }));

    

    paymentMutate(products);
  };

  /*  const products: Products[] = [
      {
        title: course.title,
        quantity: 1,
        price: course.price,
      },
    ];
    paymentMutate(products); */

  return (
    <div className="flex flex-col gap-2 w-full lg:w-[40%]">
      <section className="flex flex-col ">
        <h1 className="lg:text-2xl font-bold">Total:</h1>
        <span className="lg:text-4xl font-bold"> ${cart?.totalPrice} </span>

        {couponDiscount > 0 ? (
          <>
            <span className="line-through text-lg font-bold text-gray-500">
              ${totalPrice}
            </span>
            <span className="font-semibold"> {couponDiscount * 100}% Off </span>
          </>
        ) : (
          <></>
        )}
        <button
          onClick={() => handlePayment()}
          className="p-3 bg-blue-700 w-full text-white font-bold"
        >
          Checkout
        </button>
      </section>
      <h1 className="font-bold text-lg">Promotions</h1>
      <input
        type="text"
        className="p-2"
        placeholder="coupon"
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button
        /*   onClick={() => handleCoupon()} */
        className="bg-dark-purple p-2 font-bold text-white"
      >
        Apply
      </button>
    </div>
  );
}

export default CartCoupon;

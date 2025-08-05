import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { coursePayment } from "../../api/coursesAPI";
import { applyCoupon } from "../../api/cartAPI";
import { Products } from "../../types/products";
import { cartSaved } from "../../types/cart";

type CartCouponProps = {
  cart: cartSaved | undefined;
};

function CartCoupon({ cart }: CartCouponProps) {
  const [coupon, setCoupon] = useState("");
  const [triggerCheck, setTriggerCheck] = useState(false);

  const {
    data: discount,
    error: couponError,
    isFetching,
  } = useQuery({
    queryKey: ["coupon", coupon],
    queryFn: () => applyCoupon(coupon),
    enabled: triggerCheck && !!coupon,
  });

  const { mutate: paymentMutate } = useMutation({
    mutationFn: (products: Products[]) => coursePayment(products),
    onSuccess: (data) => {
      if (data.url) {
        /* window.location.href = data.url; */
      }
    },
    onError: (error) => {
      console.log("Payment error", error);
    },
  });

  const handleCouponCheck = () => {
    setTriggerCheck(true);
  };

  const handlePayment = () => {
    const products: Products[] =
      cart?.courses?.map((course) => ({
        title: course.title,
        quantity: 1,
        price: discount?.discount
          ? Math.floor(course.price * (1 - discount.discount))
          : course.price,
      })) || [];
      console.log("Products for payment:", products);
      

    paymentMutate(products);
  };

  const totalPrice = cart?.totalPrice || 0;
  const finalPrice = discount?.discount
    ? totalPrice * (1 - discount.discount)
    : totalPrice;
console.log(finalPrice, "final price");

  return (
    <div className="flex flex-col gap-2 w-full lg:w-[40%]">
      <section className="flex flex-col">
        <h1 className="lg:text-2xl font-bold">Total:</h1>
        <span className="lg:text-4xl font-bold">${finalPrice.toFixed(2)}</span>

        {discount?.discount > 0 && (
          <>
            <span className="line-through text-lg font-bold text-gray-500">
              ${totalPrice.toFixed(2)}
            </span>
            <span className="font-semibold">
              {discount.discount * 100}% Off
            </span>
          </>
        )}

        <button
          onClick={handlePayment}
          className="p-3 bg-blue-700 w-full text-white font-bold mt-4"
        >
          Checkout
        </button>
      </section>

      <h1 className="font-bold text-lg mt-4">Promotions</h1>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-md"
        placeholder="Enter coupon"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button
        onClick={handleCouponCheck}
        disabled={isFetching}
        className="bg-dark-purple p-2 font-bold text-white mt-2 disabled:opacity-50"
      >
        {isFetching ? "Checking..." : "Apply"}
      </button>

      {couponError && (
        <span className="text-red-600 text-sm mt-1">
          Invalid or expired coupon.
        </span>
      )}
    </div>
  );
}

export default CartCoupon;

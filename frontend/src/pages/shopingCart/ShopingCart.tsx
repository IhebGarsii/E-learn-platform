import { useMutation } from "@tanstack/react-query";
import { useCartState } from "../../state/cart";
import { removeFromCart } from "../../api/cartAPI";
import CartRow from "../../components/cartComponents/CartRow";
import { useState } from "react";
import { cartSaved } from "../../types/cart";
import CartCoupon from "../../components/cartComponents/CartCoupon";

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

  const handleRemove = (idCourse: string) => {
    if (cart) {
      mutateRemove(idCourse);
    }
  };

  return (
    <div className="mt-12 w-full  p-2 flex  shadow-md flex-col gap-7 ">
      <h1 className="text-center p-3 text-xl  lg:text-3xl font-bold">
        You Have {cart?.quantity} Items In Your Cart
      </h1>
      <div className="flex items-center w-[80%] flex-col lg:items-start  lg:flex-row gap-5 mx-auto">
        <CartCoupon />
        <nav className="w-full mx-auto">
          {cart?.courses?.map((course) => (
            <CartRow key={course._id} course={course} onRemove={handleRemove} />
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ShopingCart;

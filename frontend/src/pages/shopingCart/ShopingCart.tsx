import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCartState } from "../../state/cart";
import { getUserCart, removeFromCart } from "../../api/cartAPI";
import CartRow from "../../components/cartComponents/CartRow";
import { useState } from "react";
import { cart, cartSaved } from "../../types/cart";
import CartCoupon from "../../components/cartComponents/CartCoupon";
import { useStore } from "../../hooks/zustand";
import { cousers } from "../../types/course";

function ShopingCart() {
  const userId = localStorage.getItem("idUser");

  console.log(userId);

  const queryClient = useQueryClient();
  const { data: cart } = useQuery<cartSaved>({
    queryKey: ["cart", userId],
    queryFn: () => getUserCart(userId!),
    enabled: !!userId,
  });
  console.log("cart from cart", cart);

  const { mutate: mutateRemove } = useMutation({
    mutationFn: (idCourse: string) => removeFromCart(idCourse, cart?._id!),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
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
        <CartCoupon cart={cart} />
        <nav className="w-full mx-auto">
          {cart?.courses?.map((course: any) => (
            <CartRow key={course._id} course={course} onRemove={handleRemove} />
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ShopingCart;

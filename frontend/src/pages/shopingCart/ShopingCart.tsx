import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserCart, removeFromCart } from "../../api/cartAPI";
import CartRow from "../../components/cartComponents/CartRow";
import { cartSaved } from "../../types/cart";
import CartCoupon from "../../components/cartComponents/CartCoupon";
import { cousers } from "../../types/course";
import { useStore } from "../../hooks/zustand";

function ShopingCart() {
  const userId = localStorage.getItem("idUser");
  const setBoughtCourses = useStore((state) => state.setBoughtCourses);
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
    onSuccess: () => {
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
          {cart?.courses?.map((course: cousers) => (
            <CartRow key={course._id} course={course} onRemove={handleRemove} />
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ShopingCart;

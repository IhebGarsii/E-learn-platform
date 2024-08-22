import { useMutation } from "@tanstack/react-query";
import { useCartState } from "../../state/cart";
import { removeFromCart } from "../../api/cartAPI";
import CartRow from "../../components/cartComponents/CartRow";
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
    <div className="mt-12 w-[90%] mx-auto flex  shadow-md flex-col gap-7 ">
      <h1 className="text-center p-3 text-xl lg:text-3xl font-bold">
        You Have {cart?.quantity} Items In Your Cart
      </h1>
      {cart?.courses?.map((course) => (
        <CartRow course={course} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export default ShopingCart;

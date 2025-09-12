const BASE_URL = "http://localhost:4000/cart";
const COUPON_URL = "http://localhost:4000/coupon";

export const addToCart = async (idCourse: string, idUser: string) => {
  try {
    const response = await fetch(`${BASE_URL}/addToCart/${idUser}/${idCourse}`);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* export const applyCoupon = async (coupon: string) => {
  try {
    const res = await fetch(`${COUPON_URL}/getCoupon/${coupon}`);
    if (!res.ok) {
      throw new Error(`Error fetching coupon: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to apply coupon:", error);
    throw error;
  }
};
export const updateProductQuantity = async () => {
  
};
 */
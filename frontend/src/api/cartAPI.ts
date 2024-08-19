const BASE_URL = "http://localhost:4000/cart";

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
export const getUserCart = async (idUser: string) => {
  try {
    const response = await fetch(`${BASE_URL}/getUserCart/${idUser}`);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const remouveFromCart = async () => {};
export const updateProductQuantity = async () => {};

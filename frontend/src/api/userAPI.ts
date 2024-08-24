import { googleLogin } from "../types/googleLogin";

const BASE_URL = "http://localhost:4000/users";
export const signin = async (data: googleLogin) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const login = await response.json();
    if (!response.ok) {
      // If the response is not ok, throw an error with the status text
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { ok: true, ...login };
  } catch (error: any) {
    console.error(error);

    return { ok: false, error: error.message };
  }
};

export const signup = async (formData: FormData) => {
  try {
    console.log(formData.getAll("password"));
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/updateUser`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getUserById = async (idUser: string) => {
  const user = await fetch(`${BASE_URL}/getUserById/${idUser}`);
  if (!user.ok) {
    throw new Error("error");
  }
  return await user.json();
};

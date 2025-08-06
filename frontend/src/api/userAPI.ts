import { json } from "react-router-dom";
import { googleLogin } from "../types/googleLogin";
import { instructor } from "../types/instructor";

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
export const updateUserInformation = async (
  data: instructor,
  idUser: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/updateUserInformation/${idUser}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getUserById = async (idUser: string | null) => {
  const user = await fetch(`${BASE_URL}/getUserById/${idUser}`);
  if (!user.ok) {
    throw new Error("error");
  }
  return await user.json();
};

export const followUser = async () => {
  try {
  } catch (error) {}
};

export const getOnlineUsers = async (idList: string[]) => {
  try {
    console.log(idList, "idList");

    const response = await fetch(`${BASE_URL}/getOnlineUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idList }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdateUserPhoto = async (image: File, idUser: string) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(`${BASE_URL}/updateUserPhoto/${idUser}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.json();
};
export const getStudentCourses = async (idUser: string) => {
  try {
    const response = await fetch(`${BASE_URL}/getStudentCourses/${idUser}`);
    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

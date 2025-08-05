import { Products } from "../types/products";

const BASE_URL = "http://localhost:4000/courses";

export const getAllCourses = async (page = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/getAllCourses?page=${page}`);
    return await response.json(); // Should return { courses: [...], hasMore: true/false }
  } catch (error) {
    throw error;
  }
};

export const getCourse = async (idCourse: string) => {
  try {
    const response = await fetch(`${BASE_URL}/getCourse/${idCourse}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const addCourse = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/addCourse`, {
      method: "POST",
      body: formData, // Pass FormData directly
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add course");
  }
};

export const DeleteCourse = async (idUser: string, idCourse: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/deleteCourse/${idUser}/${idCourse}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("errrrrrrrrrrrr");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCourse = async (
  formData: FormData,
  idUser: string,
  idCourse: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/updateCourse/${idUser}/${idCourse}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const searchProducts = async (term: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/getCourses?search=${encodeURIComponent(term)}`
    );
    if (!response.ok) {
      throw new Error("error");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getInstructorCourses = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/getInstructorCourses/${userId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const coursePayment = async (products: Products[]) => {
  try {
    console.log("api payment");

    const response = await fetch(`${BASE_URL}/coursePayment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Payment error:", error);
    throw error;
  }
};

export const addStudentToCourse = async (
  courseIds: string[],
  userId: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/addStudentToCourse/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseIds }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error adding student to course:", error);
    throw error;
  }
};

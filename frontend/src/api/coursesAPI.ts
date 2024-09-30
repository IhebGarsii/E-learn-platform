const BASE_URL = "http://localhost:4000/courses";

export const getAllCourses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllCourses`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
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

export const UpdateCourse = async (
  formData: FormData,
  idUser: string,
  idCourse: string
) => {
  try {
    const response = await fetch(`/updateCourse/${idUser}/${idCourse}`, {
      method: "PUT",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

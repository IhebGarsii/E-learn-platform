const BASE_URL = "http://localhost:4000/projects";

export const createProjectAPI = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/createProject`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

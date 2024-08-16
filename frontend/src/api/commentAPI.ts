import { comment } from "../types/comment";

const BASE_URL = "http://localhost:4000/courses";

export const addCommentToVideo = async (data: comment) => {
  try {
    const response = await fetch(`${BASE_URL}/addCommentToVideo`, {
      method: "POST",
      headers: { ContentType: "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

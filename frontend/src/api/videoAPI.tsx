const BASE_URL = "http://localhost:4000/videos";

export const deleteVideo = async (idVideo: string) => {
  try {
    const response = await fetch(`${BASE_URL}/updatedVideo/${idVideo}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`error in deleting the video ,${response}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

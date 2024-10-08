const BASE_URL = "http://localhost:4000/videos";

export const deleteVideo = async (
  idVideos: string,
  idSection: string,
  idVideo: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/deleteVideo/${idVideos}/${idSection}/${idVideo}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`error in deleting the video ,${response}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addVideo = async (
  formData: FormData,
  idVideos: string,
  idSection: string,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/addVideo/${idVideos}/${idSection}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("error");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

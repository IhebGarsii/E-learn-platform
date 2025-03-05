import { comment } from "../types/comment";
import { replyComment } from "../types/replyComment";

const BASE_URL = "http://localhost:4000/courses";

export const addCommentToVideo = async (data: comment) => {
  try {
    console.log(data);
    const response = await fetch(`${BASE_URL}/addCommentToVideo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

export const getVideoComments = async (videoList: string, idVideo: string) => {
  try {
    console.log(videoList);
    const response = await fetch(
      `${BASE_URL}/getVideoComments/${videoList}/${idVideo}`
    );
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addReplyAPI = async (data: replyComment) => {
  try {
    const response = await fetch(`${BASE_URL}/addReplyComment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

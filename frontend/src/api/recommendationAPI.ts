const BASE_URL = "http://localhost:4000/recommendations";

export const getRecommendations = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`);
    if (!res.ok) throw new Error(`Failed to fetch recommendations: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("recommendation api error", err);
    throw err;
  }
};

export default { getRecommendations };

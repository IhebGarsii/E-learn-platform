import React, { useEffect, useState } from "react";
import { cousers } from "../../types/course";
import { getRecommendations } from "../../api/recommendationAPI";

type Props = { userId: string };

export const RecommendedCourses: React.FC<Props> = ({ userId }) => {
  const [courses, setCourses] = useState<cousers[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getRecommendations(userId);
        if (mounted) setCourses(data);
      } catch (err: any) {
        console.error(err);
        if (mounted) setError(err.message || "Error");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (userId) load();
    return () => {
      mounted = false;
    };
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="recommended-courses">
      <h3>Recommended for you</h3>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && courses.length === 0 && (
        <div>No recommendations yet.</div>
      )}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {courses.map((c) => (
          <div
            key={c._id}
            style={{ width: 200, border: "1px solid #eee", padding: 8 }}
          >
            <img
              src={c.thumbnail}
              alt={c.title}
              style={{ width: "100%", height: 110, objectFit: "cover" }}
            />
            <div style={{ fontWeight: 600, marginTop: 8 }}>{c.title}</div>
            <div style={{ color: "#666" }}>{c.secondTitle}</div>
            <div style={{ marginTop: 6 }}>${c.price ?? "Free"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;

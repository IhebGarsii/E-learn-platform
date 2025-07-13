import Skeleton from "react-loading-skeleton";
import { Fragment } from "react";

type SkeletonCardProps = {
  card?: number;
};

function SkeletonCard({ card = 1 }: SkeletonCardProps) {
  return (
    <>
      {Array(card)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="mb-6">
            {" "}
            {/* wrap and add spacing */}
            <div>
              <Skeleton
                style={{ borderRadius: "8px" }}
                height={100}
                width="100%"
              />
            </div>
            <div className="mt-2">
              <Skeleton count={3} />
            </div>
          </div>
        ))}
    </>
  );
}

export default SkeletonCard;

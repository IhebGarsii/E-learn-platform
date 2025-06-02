import { Link } from "react-router-dom";
import { useUserState } from "../../state/user";
import { Rating } from "@smastrom/react-rating";
import { Fragment } from "react/jsx-runtime";
import ProjectCard from "../projectComponents/ProjectCard";
import { useState } from "react";
import ProjectDetail from "../projectComponents/ProjectDetail";
import DOMPurify from "dompurify";
import PublicProfileCourseCard from "./PublicProfileCourseCard";

function PublicProfile() {
  const { data: user } = useUserState();

  const [projectDetail, setProjectDetail] = useState(false);
  const onClickDetail = (display: boolean) => {
    setProjectDetail(display);
  };
  const handelCloseProject = () => {
    setProjectDetail(false);
  };
  const sanitizedHtml = DOMPurify.sanitize(user?.aboutMe || "");
  return (
    <div className="mt-14 p-3 flex flex-col gap-10  w-[90%]  lg:w-[80%] mx-auto ">
      <section className="flex gap-3 items-center bg-gray-100 p-3 rounded-md shadow-md">
        <img
          className="w-25 h-25 md:w-40   md:h-40  max-w-xs rounded-full"
          src={
            user?.image.startsWith("https")
              ? user?.image
              : `http://localhost:4000/uploads/users/${user?.image}`
          }
          alt="User profile"
        />

        <main className="flex flex-col justify-center items-start ml-3">
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          <div className="flex  flex-col ">
            <h2>follower: {user?.followers.length}</h2>
            <h2>following: {user?.following.length} </h2>
          </div>
          <div className=" flex items-center ">
            <Rating
              className="text-xs "
              style={{ maxWidth: 250, width: 100 }}
              value={user?.avgRate.displayRate ?? 0}
              readOnly
            />
            <span className="whitespace-nowrap">
              ({user?.avgRate.displayRate ?? 0} ratings)
            </span>
          </div>
        </main>
      </section>
      <section>
        <h1 className="text-xl pb-2 font-semibold">About Me:</h1>
        <div
          className="text-sm h-fit"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
        <nav className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2">
          {user?.courses.map((course) => (
            <PublicProfileCourseCard course={course} key={course._id} />
          ))}
        </nav>
        <div className="relative">
          {user?.projects.map((proj) =>
            typeof proj !== "string" ? (
              <>
                <ProjectCard
                  onClick={() => onClickDetail(!projectDetail)}
                  project={proj}
                  key={proj._id}
                />
              </>
            ) : (
              <div key={proj}>
                <p>{proj}</p>
              </div>
            )
          )}
          {projectDetail && (
            <div className="bg-red-900 w-[50%] h-[50%] absolute top-5">
              <button onClick={() => handelCloseProject()}>close</button>
              <ProjectDetail />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PublicProfile;

import { Link } from "react-router-dom";
import { useUserState } from "../../state/user";
import { Rating } from "@smastrom/react-rating";
import { Fragment } from "react/jsx-runtime";
import ProjectCard from "../projectComponents/ProjectCard";
import { useState } from "react";
import ProjectDetail from "../projectComponents/ProjectDetail";
import DOMPurify from "dompurify";

function PublicProfile() {
  const { data: user } = useUserState();

  const [projectDetail, setProjectDetail] = useState(false);
  const onClickDetail = (display: boolean) => {
    setProjectDetail(display);
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
            <Fragment key={course._id}>
              <div className="flex  border border-gray-400 my-2 p-1 rounded-md relative ">
                <img
                  className="w-20 h-20 md:w-40 md:h-40 rounded-md mb-2"
                  src={`http://localhost:4000/uploads/courses/${course.thumbnail}`}
                  alt=""
                />

                <div className="flex flex-col justify-around ml-2">
                  <Link
                    to={`/Course/${course._id}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150"
                  >
                    {course.title}
                  </Link>
                  <div className="flex flex-col ">
                    <nav className="flex  ">
                      {course.headTags.map((tag, key) => (
                        <span
                          key={key}
                          className="border-2 border-gray-900 rounded-xl w-fit p-1 m-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </nav>
                    <nav className="flex ">
                      {course.tags.map((tag, key) => (
                        <span
                          key={key}
                          className="border-2 border-gray-900 rounded-xl w-fit p-1 m-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </nav>
        <div className="relative">
          {user?.projects.map((proj) =>
            typeof proj !== "string" ? (
              <>
                <ProjectCard
                  onClick={onClickDetail}
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
            <div className="bg-red-900 w-screen h-screen absolute top-5">
              <ProjectDetail />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PublicProfile;

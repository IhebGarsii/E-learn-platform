import { Link } from "react-router-dom";
import { useUserState } from "../../state/user";
import { Rating } from "@smastrom/react-rating";
import { Fragment } from "react/jsx-runtime";
import { memorySizeOf } from "../../utl/memorySizeOf";
import ProjectCard from "../projectComponents/ProjectCard";
import { project } from "../../types/project";
import { useState } from "react";
import ProjectDetail from "../projectComponents/ProjectDetail";

function PublicProfile() {
  const { data: user } = useUserState();
  const memorySize = memorySizeOf(user);
  const [projectDetail, setProjectDetail] = useState(false);
  const onClickDetail = (display: boolean) => {
    setProjectDetail(display);
  };

  console.log(memorySize);
  return (
    <div className="mt-14 p-3">
      <section className="flex flex-col items-start ">
        <main className="flex items-center gap-3">
          <img
            className="w-14 h-14 md:w-40  md:h-40  max-w-xs rounded-full"
            src={`http://localhost:4000/uploads/users/${user?.image}`}
            alt="User profile"
          />
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </main>
        <div className="flex gap-3">
          <h2>follower</h2>
          <h2>following</h2>
        </div>
        <div className=" flex items-center ">
          <span>{user?.avgRate.rate}</span>
          <Rating
            className="text-xs "
            style={{ maxWidth: 250, width: 100 }}
            value={user!.avgRate.rate}
            readOnly
          />
          <span className="whitespace-nowrap">
            ({user?.avgRate.nbRate} ratings)
          </span>
        </div>
      </section>
      <section>
        <h1 className="text-xl font-semibold">About Me:</h1>
        <p> {user?.aboutMe} </p>
        <nav className="grid grid-cols-1 md:grid-cols-2 ">
          {user?.courses.map((course) => (
            <Fragment key={course._id}>
              <div className="flex flex-col border border-gray-400 my-2 p-1 rounded-md relative ">
                <Link
                  to={`/Course/${course._id}`}
                  className="text-sm font-semibold"
                >
                  {course.title}
                </Link>
                <button className="absolute right-0">sdsds</button>
                <nav className="flex ">
                  {course.tags.map((tag) => (
                    <span className="border-2 border-gray-900 rounded-xl w-fit p-1 m-1">
                      {tag}
                    </span>
                  ))}
                </nav>
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

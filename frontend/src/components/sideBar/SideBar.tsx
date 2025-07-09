import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Courses from "../../pages/courses/Courses";
import Login from "../../pages/login/Login";
import AddCourse from "../../pages/InstructorDashboard/AddCourse";
import SignUp from "../../pages/signUp/SignUp";
import CourseDetail from "../../pages/courseDetail/CourseDetail";
import VideoPlayer from "../../pages/videoPlayer/VideoPlayer";
import ShopingCart from "../../pages/shopingCart/ShopingCart";
import Profile from "../../pages/profile/Profile";
import UpdateBasic from "../profileComponents/UpdateBasic";
import PublicProfile from "../profileComponents/PublicProfile";
import AddProject from "../../pages/InstructorDashboard/AddProject";
import UpdateCourse from "../../pages/InstructorDashboard/UpdateCourse";
import Welcome from "../../pages/welcome/Welcom";
import { useUserState } from "../../state/user";
import { useStore } from "../../hooks/zustand";
import InstructorsList from "../../pages/instructorsList/InstructorsList";

function SideBar() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string>("");
  const { data: user } = useUserState();
  const rolee = useStore((state) => state.role);
  useEffect(() => {

    if (user === null) {
      setRole("");
    } else if (user?.role) {
      setRole(user.role);
      console.log("ROLE",user.role);

    }
  }, [user]);

  const Menus = [
    { title: "Dashboard", src: "Chart_fill", link: "/addProject" },
    { title: "Inbox", src: "Chat", link: "/coursesDarshboard" },
    { title: "Accounts", src: "User", gap: true, link: "/coursesDarshboard" },
    { title: "Schedule ", src: "Calendar", link: "/coursesDarshboard" },
    { title: "Search", src: "Search", link: "/coursesDarshboard" },
    { title: "Analytics", src: "Chart", link: "/coursesDarshboard" },
    {
      title: "Manage Courses ",
      src: "Folder",
      link: "/coursesDarshboard",
      gap: true,
    },
    { title: "Setting", src: "Setting", link: "/coursesDarshboard" },
  ];

  return (
    <div className="flex  ">
      {rolee && (
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple min-h-screen  p-5  pt-20 relative duration-300  `}
        >
          <img
            src="./src/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-20 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="./src/assets/logo.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Designer
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
              >
                <img src={`./src/assets/${Menu.src}.png`} />
                <Link
                  to={Menu.link}
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="min-h-screen  overflow-hidden w-fit flex-1">
        <Routes>
          <Route path="/Courses" element={<Courses />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/:role" element={<SignUp />} />
          <Route path="coursesDarshboard" element={<AddCourse />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/Course/:idCourse" element={<CourseDetail />} />
          <Route
            path="/Course/:idCourse/:idVid/:idVideo"
            element={<VideoPlayer />}
          />
          <Route path="/cart/:idUser" element={<ShopingCart />} />
          <Route path="/profile/:idUser" element={<Profile />} />
          <Route path="/profile/:idUser/basic" element={<UpdateBasic />} />
          <Route
            path="/profile/:idUser/publicProfile"
            element={<PublicProfile />}
          />
          <Route path="updateCourse/:idCourse" element={<UpdateCourse />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/instructorsList" element={<InstructorsList />} />
        </Routes>
      </div>
    </div>
  );
}

export default SideBar;

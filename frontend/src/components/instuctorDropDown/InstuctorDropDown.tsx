import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUserState } from "../../state/user";
import { useStore } from "../../hooks/zustand";
function InstuctorDropDown() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string>("");
  const { data: user } = useUserState();
  const rolee = useStore((state) => state.role);
  console.log(rolee, "eeeeeeeeeeeeeeeeeeee");

  useEffect(() => {
    if (user === null) {
      setRole("");
    } else if (user?.role) {
      setRole(user.role);
      console.log("ROLE", user.role);
    }
  }, [user]);

  const Menus = [
    { title: "Add Project", src: "Chart_fill", link: "/addProject" },
    { title: "Add Course", src: "Chat", link: "/coursesDarshboard" },
    {
      title: "My Courses",
      src: "User",
      gap: true,
      link: "/instructorCourseList",
    },
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
    <div>
      <div className="">
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
    </div>
  );
}

export default InstuctorDropDown;

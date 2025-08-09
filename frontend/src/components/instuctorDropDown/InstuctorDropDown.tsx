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
    {
      title: "Add Project",
      src: "../../../public/Chart_fill",
      link: "/addProject",
    },
    {
      title: "Add Course",
      src: "../../../public/Chat",
      link: "/coursesDarshboard",
    },
    {
      title: "My Courses",
      src: "../../../public/User",
      gap: true,
      link: "/instructorCourseList",
    },
    {
      title: "Schedule ",
      src: "../../../public/Calendar",
      link: "/coursesDarshboard",
    },
    {
      title: "Search",
      src: "../../../public/Search",
      link: "/coursesDarshboard",
    },
    {
      title: "Analytics",
      src: "../../../public/Chart",
      link: "/coursesDarshboard",
    },
    {
      title: "Manage Courses ",
      src: "../../../public/Folder",
      link: "/coursesDarshboard",
      gap: true,
    },
    {
      title: "Setting",
      src: "../../../public/Setting",
      link: "/coursesDarshboard",
    },
  ];

  return (
    <div>
      <ul className="pt-2 pl-5 flex flex-col gap-y-2 text-gray-900">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className="flex justify-right w-fit  items-center gap-2"
          >
            <img src={`./src/assets/${Menu.src}.png`} />
            <Link to={Menu.link} className="">
              {Menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InstuctorDropDown;

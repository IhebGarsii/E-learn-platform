import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import img from "../../assets/arrow-dwon.png";
import useLoginUser from "../../utl/useLoginUser.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "../../api/userAPI";
import { FaCartShopping } from "react-icons/fa6";
import { getUserCart } from "../../api/cartAPI.js";
import SmallCart from "../cartComponents/SmallCart.js";
import { useStore } from "../../hooks/zustand.js";
import { useUserState } from "../../state/user.js";

import Skeleton from "react-loading-skeleton";

function Navbar() {
  console.log("navbar");

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const profileButtonRef = useRef<HTMLImageElement | null>(null);
  const queryClient = useQueryClient();
  const setRole = useStore((state) => state.setRole);
  const setOnlineUsersId = useStore((state) => state.setOnlineUsersId);
  const onlineUsersId = useStore((state) => state.onlineUsersId);
  const userId = useMemo(() => localStorage.getItem("idUser"), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        profileMenu &&
        profileRef.current &&
        !profileRef.current.contains(target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(target)
      ) {
        setProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenu]);

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getUserCart(userId),
    enabled: !!userId,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
  });
  const navigate = useNavigate();
  const logedin = useLoginUser(localStorage.getItem("idUser")!);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handelProfile = () => {
    setProfileMenu(!profileMenu);
  };

  const logout = () => {
    setProfileMenu(false);
    localStorage.clear(); // clears role, token, etc.
    queryClient.removeQueries({ queryKey: ["user", userId] });
    setRole("");
    setOnlineUsersId([]);
    /* socket.disconnect(); */

    queryClient.removeQueries({ queryKey: ["onlineUsers"] });

    navigate("/");
  };
  return (
    <div className="fixed w-full z-10 font-[Poppins] ">
      <header className="bg-white ">
        <nav className="flex justify-around  z items-center w-full  mx-auto">
          <div>
            <img
              className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 transition-all duration-300 cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
              alt="Logo"
            />
          </div>
          <div
            className={`nav-links z-50 duration-500 md:static absolute bg-white  md:w-fit  md:min-h-fit min-h-[40vh] left-0 transition-transform ${
              menuOpen ? "top-[90%]" : "top-[-800%]"
            } w-full flex items-center px-5`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] mx-auto gap-8">
              <li>
                <Link
                  className="hover:text-blue-500 hover:font-bold"
                  to="Courses"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-500 hover:font-bold"
                  to="/instructorsList"
                >
                  Instructors List
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-500 hover:font-bold"
                  to="/resource"
                >
                  Resource
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-500 hover:font-bold"
                  to="/developers"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-500 hover:font-bold whitespace-nowrap"
                  to="/pricing"
                >
                  How To Use
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6 min-w-fit">
            {user ? (
              <div className="relative">
                {logedin ? (
                  <>
                    <div className="flex flex-row-reverse items-center w-50 gap-6">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`http://localhost:4000/uploads/users/${user?.image}`}
                        alt={user?.image}
                      />
                      <h3 className="flex items-center gap-2">
                        <span>{user?.firstName}</span>
                        <span>{user?.lastName}</span>
                      </h3>
                      <img
                        onClick={handelProfile}
                        ref={profileButtonRef}
                        className="w-4 h-5 cursor-pointer"
                        src={img}
                        alt=""
                      />
                      <div className="relative flex group">
                        <div className="relative mr-2 text-xl cursor-pointer ">
                          <FaCartShopping />
                          <span className="bg-blue-500 text-white cursor-pointer text-xs font-semibold mr-2 px-2 py-0 rounded absolute left-4 bottom-4">
                            {cart?.quantity || 0}
                          </span>
                        </div>
                        {/* SmallCart component, shown on hover over either the cart icon or the SmallCart itself */}
                        {cart && (
                          <div className="absolute md:top-1 md:right-0 hidden pt-10 w-fit group-hover:block hover:block z-10">
                            <SmallCart cart={cart} />
                          </div>
                        )}
                      </div>
                    </div>
                    {profileMenu && (
                      <div
                        ref={profileRef}
                        className="absolute z-10 bg-gray-300 p-2 h-fit"
                      >
                        <ul className="flex flex-col gap-1">
                          <li
                            onClick={logout}
                            className="hover:bg-blue-500 hover:text-white cursor-pointer"
                          >
                            Logout
                          </li>

                          <>
                            {user && (
                              <li className="hover:bg-blue-500 hover:text-white cursor-pointer">
                                <Link
                                  onClick={handelProfile}
                                  to={`/profile/${user._id}`}
                                >
                                  Profile
                                </Link>
                              </li>
                            )}
                          </>
                          <li
                            onClick={handelProfile}
                            className="hover:bg-blue-500 hover:text-white cursor-pointer"
                          >
                            Notification
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/signup"
                    className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] whitespace-nowrap"
                  >
                    Sign up
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Skeleton width={50} height={20} />
                <Skeleton width={50} height={20} />

                <Skeleton circle width={50} height={50} />
              </div>
            )}

            <CiMenuBurger
              onClick={onToggleMenu}
              className="text-3xl cursor-pointer md:hidden"
            />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;

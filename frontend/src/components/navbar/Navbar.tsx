import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import img from "../../assets/arrow-dwon.png";
import useLoginUser from "../../utl/useLoginUser.js";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/userAPI";
import { FaCartShopping } from "react-icons/fa6";
import { getUserCart } from "../../api/cartAPI.js";
import SmallCart from "../cartComponents/SmallCart.js";

function Navbar() {
  const idUser = localStorage.getItem("idUser")!;

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(idUser),
    enabled: !!idUser,
  });

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getUserCart(idUser),
    enabled: !!idUser,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  const logedin = useLoginUser(localStorage.getItem("idUser")!);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handelProfile = () => {
    setProfileMenu(!profileMenu);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="fixed w-full z-10 font-[Poppins] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
      <header className="bg-white ">
        <nav className="flex justify-around  z items-center w-full  mx-auto">
          <div>
            <img
              className="w-12 cursor-pointer"
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
                <Link className="hover:text-gray-500" to="Courses">
                  Courses
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" to="/solution">
                  Solution
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" to="/resource">
                  Resource
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" to="/developers">
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-500 whitespace-nowrap"
                  to="/pricing"
                >
                  How To Use
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6 min-w-fit">
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
                      className="w-4 h-5 cursor-pointer"
                      src={img}
                      alt=""
                    />
                    <div className="relative flex group">
                      <Link
                        to={`cart/${user?._id}`}
                        className="relative mr-2 text-xl cursor-pointer"
                      >
                        <FaCartShopping />
                        <span className="bg-blue-500 text-white text-xs font-semibold mr-2 px-2 py-0 rounded absolute left-4 bottom-4">
                          {cart?.quantity || 0}
                        </span>
                      </Link>
                      {/* SmallCart component, shown on hover over either the cart icon or the SmallCart itself */}
                      {cart && (
                        <div className="absolute md:top-1 md:right-0 hidden pt-10 w-fit group-hover:block hover:block z-10">
                          <SmallCart cart={cart} />
                        </div>
                      )}
                    </div>
                  </div>
                  {profileMenu && (
                    <div className="absolute z-10 bg-gray-300 p-2 h-fit">
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
                              <Link to={`/profile/${user._id}`}>Profile</Link>
                            </li>
                          )}
                        </>
                        <li className="hover:bg-blue-500 hover:text-white cursor-pointer">
                          Notification
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="login"
                  className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] whitespace-nowrap"
                >
                  Sign in
                </Link>
              )}
            </div>
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

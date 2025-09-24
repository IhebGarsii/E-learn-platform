import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sideBar/SideBar";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { useStore } from "./hooks/zustand";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "./api/userAPI";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Courses from "./pages/courses/Courses";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import AddCourse from "./pages/InstructorDashboard/AddCourse";
import AddProject from "./pages/InstructorDashboard/AddProject";
import CourseDetail from "./pages/courseDetail/CourseDetail";
import ShopingCart from "./pages/shopingCart/ShopingCart";
import Profile from "./pages/profile/Profile";
import UpdateBasic from "./components/profileComponents/UpdateBasic";
import UpdateCourse from "./pages/InstructorDashboard/UpdateCourse";
import PublicProfile from "./components/profileComponents/PublicProfile";
import VideoPlayer from "./pages/videoPlayer/VideoPlayer";
import Welcome from "./pages/welcome/Welcom";
import InstructorsList from "./pages/instructorsList/InstructorsList";
import InstructorCoursesList from "./pages/InstructorDashboard/InstructorCoursesList";
import PaymentSuccess from "./pages/afterPayment/PaymentSuccess";
import PaymentFailure from "./pages/afterPayment/PaymentFailure";
import StudentCourses from "./pages/studentCourses/StudentCourses";
function App() {
  // You can get user data from cache directly
  const user = useStore((state) => state.userId);
  const setRole = useStore((state) => state.setRole);
  useEffect(() => {
    setRole(localStorage.getItem("roles")!);
  }, []);
  // ***** this sometimes cause infint call for getUserById *****

  //this couse infinte call
  /*   const { data: userr } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(localStorage.getItem("userId") || ""),
  });
  useEffect(() => {
    useStore.setState({ userId: userr?._id });
  }, [userr]); */
  //end here
  /* useEffect(() => {
   
    if (!user) return;

    console.log("👤 Emitting user-connected:", user);
    socket.emit("user-connected", user);

    const handleConnect = () => {
      console.log("🔁 Re-emitting user-connected on reconnect:", user);
      socket.emit("user-connected", user);
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [user]); */
  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      
        <Navbar />
        {/* <SideBar /> */}
        <Routes>
          <Route path="/Courses" element={<Courses />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<SignUp />} />
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
          <Route
            path="/"
            element={localStorage.getItem("idUser") ? <Courses /> : <Welcome />}
          />

          <Route path="/instructorsList" element={<InstructorsList />} />
          <Route
            path="/instructorCourseList"
            element={<InstructorCoursesList />}
          />
          <Route
            path="/studentCourseList/:idUser"
            element={<StudentCourses />}
          />
          <Route path="PaymentSuccess" element={<PaymentSuccess />} />
          <Route path="PaymentFailure" element={<PaymentFailure />} />
        </Routes>
        <Footer />
      </SkeletonTheme>
    </BrowserRouter>
  );
}
export default App;

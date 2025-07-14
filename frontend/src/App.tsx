import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sideBar/SideBar";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import socket from "./socket";
import { useStore } from "./hooks/zustand";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "./api/userAPI";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function App() {
  // You can get user data from cache directly
  const user = useStore((state) => state.userId);
 


  // ***** this sometimes cause infint call for getUserById *****
/*   const { data: userr } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(localStorage.getItem("userId") || ""),
  });
  useEffect(() => {
    useStore.setState({ userId: userr?._id });
  }, [userr]); */

  useEffect(() => {
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
  }, [user]);
  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />

        <Navbar />
        <SideBar />
        <Footer />
      </SkeletonTheme>
    </BrowserRouter>
  );
}
export default App;

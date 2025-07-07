import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sideBar/SideBar";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { useUserState } from "./state/user";
import socket from "./socket";

function App() {
  const { data: user } = useUserState();
  
  useEffect(() => {
    if (user?._id) {
      socket.emit("user-connected", user._id); // Send ID on mount or reconnect
    }

    // Optional: handle auto re-emit on reconnect
    socket.on("connect", () => {
      if (user?._id) {
        socket.emit("user-connected", user._id); // re-send after reload
      }
    });

    return () => {
      socket.off("connect");
    };
  }, [user]);
  return (
    <BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      <Navbar />

      <SideBar />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

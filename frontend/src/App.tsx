import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sideBar/SideBar";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import { useUserState } from "./state/user";
import socket from "./socket";

function App() {
  const { data: user } = useUserState();
  useEffect(() => {
    if (user?._id) {
      console.log("👤 Emitting user-connected:", user._id);
      socket.emit("user-connected", user._id);
    }

    socket.on("connect", () => {
      if (user?._id) {
        console.log("🔁 Re-emitting user-connected on reconnect:", user._id);
        socket.emit("user-connected", user._id);
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

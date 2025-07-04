import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sideBar/SideBar";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./components/footer/Footer";

function App() {
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "./SplitText";


function Welcome() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const onSelect = (role: string) => {
    setRole(role);
    if (role == "guest") {
      navigate("Courses");
      return
    }
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-custom-gradient ">
      
      <SplitText
        text=" welcome who are you"
        className="text-8xl font-bold font-Pacifico mb-10 text-blue-900"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
      <div className="flex gap-20 mt-12">
        <button
          onClick={() => onSelect("student")}
          className="text-4xl font-bold bg-custom-gradient-2 p-4 rounded-lg text-white"
        >
          Student
        </button>
        <button
          onClick={() => onSelect("instructor")}
          className="text-4xl font-bold  bg-custom-gradient-2 p-4 rounded-lg text-white"
        >
          Instructor
        </button>
        <button
          onClick={() => onSelect("guest")}
          className="text-4xl font-bold  bg-custom-gradient-2 p-4 rounded-lg text-white"
        >
          Guest
        </button>
      </div>
    </div>
  );
}
export default Welcome;

import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const onSelect = (role: string) => {
    setRole(role);
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-custom-gradient ">
      <h1 className="text-8xl font-bold font-Pacifico mb-10 text-blue-900">
        welcome who are you
      </h1>
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

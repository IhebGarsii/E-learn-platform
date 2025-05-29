import { useState } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  const [role, setRole] = useState("");
  return (
    <div>
      <h1>welcome who are you </h1>
      <Link to="login"></Link>
      <Link to="login"></Link>
      <Link to="login"></Link>
    </div>
  );
}
export default Welcome;

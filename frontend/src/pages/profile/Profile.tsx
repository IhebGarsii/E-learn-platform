import { useUserState } from "../../state/user";
import UpdateBasic from "../../components/profileComponents/UpdateBasic";
import { useState } from "react";
import { Link } from "react-router-dom";
import UpdateInformation from "../../components/profileComponents/UpdateInformation";

function Profile() {
  const { data: user } = useUserState();
  const [activeSection, setActiveSection] = useState("Profile");

  const renderSection = () => {
    switch (activeSection) {
      case "Photo":
        return <>Photo</>;
      case "Account Security":
        return <>acount</>;
      case "Update Information":
        return <UpdateInformation />;
      case "Close account":
        return <>Close account</>;
      default:
        return <UpdateBasic />;
    }
  };

  return (
    <div className="flex w-full flex-col md:flex-row md:w-[70%] gap-5 mt-16 mx-auto">
      <section className="flex flex-col justify-center items-center gap-3">
        <img
          className=" md:w-40 w-28 md:h-40 h-28 max-w-xs rounded-full"
          src={`http://localhost:4000/uploads/users/${user?.image}`}
          alt="User profile"
        />
        <nav className="flex flex-col gap-2 font-bold">
          <Link to={`publicProfile`}>View public profile</Link>
          <button onClick={() => setActiveSection("Profile")}>Profile</button>
          <button onClick={() => setActiveSection("Photo")}>Photo</button>
          <button onClick={() => setActiveSection("Account Security")}>
            Account Security
          </button>
          <button onClick={() => setActiveSection("Update Information")}>
            Update Information
          </button>
          <button onClick={() => setActiveSection("Close account")}>
            Close account
          </button>
        </nav>
      </section>
      <section className=" w-[90%] mx-auto ">{renderSection()}</section>
    </div>
  );
}

export default Profile;

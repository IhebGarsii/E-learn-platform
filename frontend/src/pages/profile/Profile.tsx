import { useUserState } from "../../state/user";
import UpdateBasic from "../../components/profileComponents/UpdateBasic";
import { useState } from "react";

function Profile() {
  const { data: user } = useUserState();
  const [activeSection, setActiveSection] = useState("Profile");

  const renderSection = () => {
    switch (activeSection) {
      case "Photo":
        return <>Photo</>;
      case "Account Security":
        return <>acount</>;
      case "Subscriptions":
        return <>Subscriptions</>;
      case "Close account":
        return <>Close account</>;
      default:
        return <UpdateBasic />;
    }
  };

  return (
    <div className="flex w-[80%] flex-col mt-16 mx-auto">
      <section className="flex flex-col justify-center items-center gap-3">
        <img
          className="w-40 h-40 rounded-full"
          src={`http://localhost:4000/uploads/users/${user?.image}`}
          alt="User profile"
        />
        <nav className="flex flex-col gap-2 font-bold">
          <button onClick={() => setActiveSection("Profile")}>
            View public profile
          </button>
          <button onClick={() => setActiveSection("Profile")}>Profile</button>
          <button onClick={() => setActiveSection("Photo")}>Photo</button>
          <button onClick={() => setActiveSection("Account Security")}>
            Account Security
          </button>
          <button onClick={() => setActiveSection("Subscriptions")}>
            Subscriptions
          </button>
          <button onClick={() => setActiveSection("Close account")}>
            Close account
          </button>
        </nav>
      </section>
      <section className="mt-8">{renderSection()}</section>
    </div>
  );
}

export default Profile;

import { Router, Route, Link } from "react-router-dom";
import { useUserState } from "../../state/user";
import UpdateBasic from "../../components/profileComponents/UpdateBasic";

function Profile() {
  const { data: user } = useUserState();
  console.log(user);
  console.log("user");

  return (
    <div className="flex w-[80%] flex-col mt-16 mx-auto ">
      <section className="flex flex-col justify-center items-center gap-3">
        <img
          className="w-40 h-40 rounded-full"
          src={`http://localhost:4000/uploads/users/${user?.image}`}
          alt=""
        />
        <nav className="flex flex-col gap-2 font-bold">
          <Link to={`basic`}>View public profile</Link>
          <Link to={``}>Profile</Link>
          <Link to={``}>Photo</Link>
          <Link to={``}>Account Security</Link>
          <Link to={``}>Subscriptions</Link>
          <Link to={``}>Close account</Link>
        </nav>
      </section>
      <section>
        <Route path="basic" element={<UpdateBasic />} />
      </section>
    </div>
  );
}

export default Profile;

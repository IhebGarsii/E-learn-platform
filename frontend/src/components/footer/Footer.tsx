import { Link } from "react-router-dom";
import companyLogo from "../../assets/pencil.png";

function Footer() {
  return (
    <div className="flex bg-footer-black w-full  justify-around p-5 text-white">
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={companyLogo} className="w-6 h-6" alt="" />
          <h1>Iheb Course</h1>
        </div>
        <div className="">
          <h1>8040 Nabeul Bouargoub</h1>
          <h1>4eme etage</h1>
          <h1>Tunisia</h1>
        </div>
        <div className="flex gap-9">
          <span>
            <h1>Phone number</h1>
            <h1>216+53218684</h1>
          </span>
          <span>
            <h1>Email</h1>
            <h1>ihebgarsi78@gmail.com</h1>
          </span>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h1>Quick Links</h1>
        <Link to="">Pricing</Link>
        <Link to="">Resources</Link>
        <Link to="">About us</Link>
        <Link to="">FQA</Link>
        <Link to="">Contact us</Link>
      </section>
      <section className="flex flex-col gap-2">
        <h1>Social</h1>
        <a href="">Facebook</a>
        <a href="">Instagram</a>
        <a href="">Linkedin</a>
        <a href="">Twitter</a>
        <a href="">Youtube</a>
      </section>
      <section className="flex flex-col gap-2">
        <h1>legal</h1>
        <Link to="">Term of service</Link>
        <Link to="">Privacy policy</Link>
        <Link to="">Cookie policy</Link>
      </section>
    </div>
  );
}

export default Footer;

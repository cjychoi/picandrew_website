import "./Contact.css";
import contactImg from "../assets/picandrew_contact.jpg";
import { FaInstagram, FaEnvelope } from "react-icons/fa6";

const Contact = () => {
  return (
    <main className="contactMain">
      <div className="contactContainer">
        <div className="contactImage">
          <img src={contactImg} alt="Contact" />
        </div>
        <div className="contactInfo">
          <a
            href="https://www.instagram.com/pic_and_rew/"
            target="_blank"
            rel="noopener noreferrer"
            className="contactLink"
          >
            <FaInstagram size={24} />
            <span>@pic_and_rew</span>
          </a>
          <a
            href="mailto:picandrew414@gmail.com"
            className="contactLink"
          >
            <FaEnvelope size={24} />
            <span>picandrew414@gmail.com</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Contact;
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaFacebook,
} from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";

import HoverLinks from "./HoverLinks";

import "./styles/SocialIcons.css";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/IT22898920" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/ravindu-pasanjith-3510b9315"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://www.facebook.com/share/17q4ZqVhcP/?mibextid=wwXIfr" target="_blank">
            <FaFacebook />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/ravindupasanjith" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      {/* TODO: Add resume link later */}
      <a
        className="resume-button"
        href="#"
        target="_blank"
        style={{ display: 'none' }}
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;

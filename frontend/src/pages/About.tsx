import "./About.css";
import { FaInstagram } from "react-icons/fa6";
import profile from "../assets/picandrew_profile.jpg";
import camera from "../assets/picandrew_camera.jpg";

const About = () => {
  return (
    <main className="aboutMain">
      <section className="aboutIntro">
        <div className="aboutImage">
          <img src={profile} alt="Andrew Choi" />
        </div>
        <div className="aboutText">
          <h2>Hi! I’m Andrew Choi</h2>
          <p>
            I picked up a camera during the quiet days of 2020, when the world slowed
            down—and it has become one of my biggest passions.<br /><br />
            Born in South Korea, and I’m currently based in San Diego, California. I
            love heading out with my camera during my free time, exploring nearby
            parks, beaches, and hidden corners of the city. My favorite time to
            shoot? An hour before sunset—the golden hour—when the light turns
            everything into magic.<br /><br />
            My photography leans toward landscapes and street scenes, but I’m always
            looking for ways to go beyond the obvious. I like finding creative angles,
            weaving in subtle stories, and using framing and subjects to bring each
            image to life.<br /><br />
            Editing is where I dive even deeper. I use Adobe Lightroom to fine-tune
            the mood, especially through masking techniques that help highlight
            details and create atmosphere.<br /><br />
            Thanks for stopping by—I hope you enjoy seeing the world through my view finder.
          </p>
          <a
            className="aboutInstaIcon"
            href="https://www.instagram.com/pic_and_rew/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </section>

          {/* Divider */}
          <div className="sectionDivider" />

            {/* Gear section */}
            <section className="gearBlock">
              <div className="gearListSection">
                  <h2>My Camera Gears</h2>
                  <div className="gearColumns">
                  <div>
                      <h4>Body</h4>
                      <ul>
                      <li>Sony a7C II</li>
                      <li>Sony a6400</li>
                      <li>Panasonic Lumix LX10</li>
                      </ul>
                      <h4>Lenses</h4>
                      <ul>
                      <li>Sony 35mm f1.4 GM</li>
                      <li>Tamron 28-200mm f2.8-5.6</li>
                      <li>Sony 85mm f1.8</li>
                      <li>Sony 35mm f1.8 APS-C</li>
                      </ul>
                  </div>
                  <div>
                      <h4>Wishlist</h4>
                      <ul>
                      <li>Sony 70-200mm GM II</li>
                      <li>Sony 50mm f1.2 GM</li>
                      </ul>
                      <h4>ETC</h4>
                      <ul>
                      <li>Peak Design Everyday Backpack Zip 20L</li>
                      <li>Peak Design Everyday Sling 10L</li>
                      <li>Peak Design Slide Lite / Cuff</li>
                      <li>K&F Concept Variable ND2-ND400 Filter</li>
                      <li>Hoya CPL Filter</li>
                      <li>SmallRig AP-20 Carbon Fiber Tripod</li>
                      <li>Sony 256GB E Series UHS-II SD Card</li>
                      </ul>
                  </div>
                  </div>
              </div>
              <div className="gearImageWrapper">
                  <img src={camera} alt="Camera gear on city street" />
              </div>
            </section>

    </main>
  );
};

export default About;


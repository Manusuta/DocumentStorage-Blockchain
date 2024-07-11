import React from 'react'
import playStore from "../images/playstore.png";
import appStore from "../images/Appstore.png";
import "./styles/footer.css";
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer id="footer">
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter">
      <h1>DOCS..</h1>
      <p>High Quality is our first priority</p>

      <p>Copyrights 2021 &copy; manusutaChauhan</p>
    </div>

    <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="http://instagram.com/manusuta_rajput" className='insta'><FaInstagram size={30}/></a>
      <a href="https://youtube.com/@rainbowcraft3495"> <FaYoutube size={30} /></a>
      <a href="https://www.linkedin.com/in/manusuta-chauhan-41438a219"> <FaLinkedin size={30} /></a>
    </div>
  </footer>
);
};
  

export default Footer

// import {
//   FaPinterestSquare,
//   FaInstagram,
//   FaTwitter,
//   FaFacebookSquare,
// } from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icon-container">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png"
        alt="icon"
        className="icon-img"
      />
      <h1 className="icon-heading">Tasty Kitchen</h1>
    </div>
    <p className="footer-description">
      The only thing we`re serious about is food. Contact us on
    </p>
    <div className="social-icon-container">
      <img
        src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628481566/Mini%20Projects/App_Logo_Inspiraton_111_gmc8qt.png"
        alt="pintrest"
        className="social-icon"
      />
      <img
        src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628481566/Mini%20Projects/instagram_euknj6.png"
        alt="instagram"
        className="social-icon"
      />
      <img
        src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628481566/Mini%20Projects/path3611_j1dgcx.png"
        alt="twitter"
        className="social-icon"
      />
      <img
        src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628481566/Mini%20Projects/App_Logo_Inspiraton_42_zlfbws.png"
        alt="facebook"
        className="social-icon"
      />
    </div>
  </div>
)

export default Footer

import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="social-icons">
        <a href="https://github.com/Sushanta-Pal" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/sushanta-pal-340b77254/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:sp0071331@gmail.com" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-envelope"></i>
        </a>
        <a href="https://www.facebook.com/sushanta.pal.1000469/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/__like__obito__/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 Sushanta Pal</p>
      </div>
    </div>
  );
}

export default Footer;

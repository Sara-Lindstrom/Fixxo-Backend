import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-background">
      <div className="social-media-links">
          <a href="https://www.facebook.com/" target="_blank" rel='noreferrer'><i className="fa-brands fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel='noreferrer'><i className="fa-brands fa-instagram"></i></a>
          <a href="https://twitter.com/" target="_blank" rel='noreferrer'><i className="fa-brands fa-twitter"></i></a>
          <a href="https://www.google.com/" target="_blank" rel='noreferrer'><i className="fa-brands fa-google"></i></a>
          <a href="https://www.linkedin.com/" target="_blank" rel='noreferrer'><i className="fa-brands fa-linkedin"></i></a>    
      </div>

      <p>&#169; 2022 Fixxo. All Rights Reserverd</p>

    </footer>
  )
}

export default Footer
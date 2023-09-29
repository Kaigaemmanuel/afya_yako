import React from 'react';

// Sample avatar image URL
const avatarImageUrl = 'https://humanrights.ca/sites/prod/files/styles/crop%5Bwidth%5D%3D1280%26crop%5Bheight%5D%3D720%26crop%5Bfp%5D%3D0.46%2C0.36%26crop%5Bmask%5D%5Btype%5D%3Dbottom%26crop%5Bmask%5D%5Bamount%5D%3D0.33%26convert%5Bformat%5D%3Dwebp%26convert%5Bextension%5D%3Dwebp/public/2022-10/The-Right-to-Choose-event-photo-2.png.webp'; // Replace with your avatar image URL

const avatarImageStyle = {
    width: '43px', // Adjust the width as needed
    height: '40px', // Adjust the height as needed
    borderRadius: '50%', // To make it circular (optional)
};

const usernameStyle = {
    padding: '5px', // Adjust the padding as needed
  };
  
  const Navbar = ({ username }) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container">
          {/* Left Section */}
          <div className="navbar-brand">
            <div>
              <h3 className="mb-0" style={{ fontSize: '1.5rem' }}>Hospital</h3>
              <p className="font-italic mb-0" style={{ fontSize: '0.8rem' }}>Powered by Afya Imara Tech</p>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link">
                  <i className="fas fa-user mr-1"></i>
                  <span style={usernameStyle}>{username}</span>
                  <img src={avatarImageUrl} alt="User Avatar" style={avatarImageStyle} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
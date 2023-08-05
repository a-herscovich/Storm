import React from "react";
import "./Header.scss";
import Search from "../Search/Search";
import Dropdown from "react-bootstrap/Dropdown";

// handleSearch is passed down from App.js to search through props so we can pass the input up from the 
// Search component where it's set
const Header = ({ handleSearch }) => {
  // This custom toggle is from Bootstrap documentation, allows us to use the 
  // 3 line menu as the modal activator
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
    <div className="header">
      <div className="logoAndMobileMenu">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1>STORM</h1>
        </div>
        {/* Mobile dropdown menu opens to show secondary actions */}
        <div className="mobileMenu">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
              <i class="bi bi-list fs-3"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdownItem" eventKey="1"><i className="bi bi-gear fs-6"></i>Settings</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" eventKey="2"> <i className="bi bi-bell fs-6"></i>Notifications</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" eventKey="3"> <i className="bi bi-person-circle fs-6"></i>Profile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="rightCol">
        <div className="searchContainer">
          <Search handleSearch={handleSearch} />
        </div>
        <div className="secondaryActions">
          <i className="bi bi-gear fs-5"></i>
          <i className="bi bi-bell fs-5"></i>
          <div className="account">
            <i className="bi bi-person-circle fs-5"></i>
            <span>Adriana Arias</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

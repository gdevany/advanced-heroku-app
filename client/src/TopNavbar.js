import React from "react";
import PropTypes from "prop-types";
import {Navbar,Nav,NavItem,} from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNavbar = (props) => {

  let navItems = "";

  if (props.showNavItems) {
    // If signed in (authenticated), show Welcome (now: Secret)
    navItems = (
                <Nav pullRight>
                  <Link to="/secret"><Navbar.Text>Secret</Navbar.Text></Link>
                  <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
                </Nav>
              );
  } else {
    // If NOT signed in (authenticated), show Sign In
    navItems = (
        <Nav pullRight>
          <NavItem onClick={props.signInClicked}>Sign Up / Sign In</NavItem>
        </Nav>
    )
  }

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {navItems}
      </Navbar.Collapse>
    </Navbar>
  );
};

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  // showNavItems: PropTypes.bool.isRequired,
  signInClicked:PropTypes.func.isRequired
};

export default TopNavbar;
// navbar-fixed-top

import React from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarCollapse,
  NavbarToggle,
  NavDropdown
 } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNavbar = (props) => {
  console.log(props);

  let navItems = "";
  // if (props.showNavItems) {
  //   navItems = (
  //             <div>
  //               <Nav pullRight>
  //                 <Link to="/secret"><Navbar.Text>Secret</Navbar.Text></Link>
  //               </Nav>
  //               <Nav pullRight>
  //                 <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
  //               </Nav>
  //             </div>
  //             );
  // } else {
  //   navItems = (
  //     <div>
  //       <Nav pullRight>
  //         <NavItem onClick={props.signInClicked}>Sign In</NavItem>
  //       </Nav>
  //     </div>
  //   )
  // }
  //
  // return (
  //   <Navbar inverse collapseOnSelect>
  //     <Navbar.Collapse>
  //       {navItems}
  //     </Navbar.Collapse>
  //   </Navbar>

  if (props.showNavItems) {
    navItems = (
                <Nav pullRight>
                  <Link to="/secret"><Navbar.Text>Secret</Navbar.Text></Link>
                  <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
                </Nav>
              );
  } else {
    navItems = (
        <Nav pullRight>
          <NavItem onClick={props.signInClicked}>Sign In</NavItem>
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


//     <nav class="navbar navbar-default">
//      <div class="container-fluid">
  //     <div class="navbar-header">
  //       <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
  //         <span class="sr-only">Toggle navigation</span>
  //         <span class="icon-bar"></span>
  //         <span class="icon-bar"></span>
  //         <span class="icon-bar"></span>
  //       </button>
  //       <a class="navbar-brand" href="#">Brand</a>
  //     </div>
//
  //     <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  //       <ul class="nav navbar-nav">
  //         <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
  //         <li><a href="#">Link</a></li>
  //         <li class="dropdown">
  //           <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
  //           <ul class="dropdown-menu">
  //             <li><a href="#">Action</a></li>
  //             <li><a href="#">Another action</a></li>
  //             <li><a href="#">Something else here</a></li>
  //             <li role="separator" class="divider"></li>
  //             <li><a href="#">Separated link</a></li>
  //             <li role="separator" class="divider"></li>
  //             <li><a href="#">One more separated link</a></li>
  //           </ul>
  //         </li>
  //       </ul>
  //       <form class="navbar-form navbar-left">
  //         <div class="form-group">
  //           <input type="text" class="form-control" placeholder="Search"/>
  //         </div>
  //         <button type="submit" class="btn btn-default">Submit</button>
  //       </form>
  //       <ul class="nav navbar-nav navbar-right">
  //         <li><a href="#">Link</a></li>
  //         <li class="dropdown">
  //           <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
  //           <ul class="dropdown-menu">
  //             <li><a href="#">Action</a></li>
  //             <li><a href="#">Another action</a></li>
  //             <li><a href="#">Something else here</a></li>
  //             <li role="separator" class="divider"></li>
  //             <li><a href="#">Separated link</a></li>
  //           </ul>
  //         </li>
  //       </ul>
  //     </div>
  //    </div>
    // </nav>
  );
};

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.bool.isRequired,
  signInClicked:PropTypes.func.isRequired
};

export default TopNavbar;

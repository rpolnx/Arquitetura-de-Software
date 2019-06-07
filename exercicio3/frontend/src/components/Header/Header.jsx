import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';

const Header = () => {
  const [user, setUser] = useState("");

  return (
    <Navbar collapseOnSelect expand="md" fixed="top">
      <Navbar.Brand href="/dashboard">
        <img
          alt=""
          src="../../asa-1.jpg"
          width="67"
          height="40"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/categories">Categories</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/purchases">Purchases</Nav.Link>
          <Nav.Link href="/sales">Sales</Nav.Link>
          <Nav.Link href="/sellers">Sellers</Nav.Link>
          <Nav.Link href="/suppliers">Suppliers</Nav.Link>          
        </Nav>
        <Nav>
          <Nav.Link href="/"><FontAwesomeIcon icon="user" size="lg" /> | {user || "Login"}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

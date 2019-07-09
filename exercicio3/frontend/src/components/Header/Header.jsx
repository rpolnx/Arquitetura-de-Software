import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

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
          <NavLink to="/categories" className="nav-link">
            Categories
          </NavLink>
          <NavLink to="/products" className="nav-link">
            Products
          </NavLink>
          <NavLink to="/purchases" className="nav-link">
            Purchases
          </NavLink>
          <NavLink to="/sales" className="nav-link">
            Sales
          </NavLink>
          <NavLink to="/sellers" className="nav-link">
            Sellers
          </NavLink>
          <NavLink to="/suppliers" className="nav-link">
            Suppliers
          </NavLink>
        </Nav>
        <Nav>
          <NavLink to="/" className="nav-link">
            <FontAwesomeIcon icon="user" size="lg" /> | {user || "Login"}
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

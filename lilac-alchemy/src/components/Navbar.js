import React, { useState } from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/logo.svg";

function NavigationBar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const closeNav = () => setExpanded(false);

  return (
    <Navbar
      className={styles.Navbar}
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <Row className={`${styles.NavbarRow} m-auto`}>
          <Col></Col>
          <Col className="text-center">
            <img
              src={logo}
              alt="Logo"
              width="43"
              height="43"
              className={`${styles.Logo} d-inline-block align-top mr-2`}
            />
            <Navbar.Brand
              href="/"
              className={`${styles.Brand} text-center mx-auto`}
            >
              Lilac Alchemy
            </Navbar.Brand>
          </Col>
          <Col className="d-flex justify-content-end">
            <Navbar.Toggle
              className={`${styles.Hamburger} border-0 pe-0`}
              aria-controls="basic-navbar-nav"
              onClick={handleToggle}
            />
          </Col>
        </Row>

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className={styles.Nav}>
            <LinkContainer to="/">
              <Nav.Link onClick={closeNav}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/collection">
              <Nav.Link onClick={closeNav}>Collection</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link onClick={closeNav}>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link onClick={closeNav}>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

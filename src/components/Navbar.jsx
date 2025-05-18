import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import {
  Navbar as NavbarBS,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
} from "react-bootstrap";

import ThemeSelector from "./ThemeSelector";


function Navbar({ toggleTheme, darkMode }) {
  const { user, logout } = useContext(authContext);

  return (
    <NavbarBS  className={"shadow-lg mb-3"}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          {!user && (
            <>
              <Nav.Link to="/login" as={NavLink}>
                Login
              </Nav.Link>
              <Nav.Link to="/signup" as={NavLink}>
                Sign Up
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link to="/projects" as={NavLink}>
                Projects
              </Nav.Link>
              <Nav.Link to="/createProject" as={NavLink}>
                Creare Project
              </Nav.Link>
            </>
          )}
        </Nav>
        <Form>
          <Form.Check type="switch" id="custom-switch" onClick={toggleTheme} />
        </Form>
          <ThemeSelector/>
        {user && (
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        )}
      </Container>
    </NavbarBS>
  );
}

export default Navbar;

import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LuLogOut, LuNotebookPen } from "react-icons/lu";
import { FaHouseUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { useUser } from "../../context/userContext";

const Header = () => {
  const { user, setUser } = useUser();
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="text-white">
          FT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && user?._id ? (
              <>
                <Nav.Link
                  className="d-flex align-items-center text-white"
                  as={Link}
                  to="/dashboard"
                >
                  <MdSpaceDashboard className="me-1" />
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  className="d-flex align-items-center text-white"
                  as={Link}
                  to="/transaction"
                >
                  <AiOutlineTransaction className="me-1" />
                  Transaction
                </Nav.Link>
                <Button
                  onClick={() => {
                    //remove user data from context
                    setUser({});
                    localStorage.removeItem("accessToken");
                  }}
                >
                  <LuLogOut className="me-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* <Nav.Link
                  className="d-flex align-items-center text-white"
                  as={Link}
                  to="/login"
                >
                  <FaHouseUser className="me-1" />
                  Login
                </Nav.Link> */}
                {/* <Nav.Link
                  className="d-flex align-items-center text-white"
                  as={Link}
                  to="/signup"
                >
                  <LuNotebookPen className="me-1" />
                  Signup
                </Nav.Link> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

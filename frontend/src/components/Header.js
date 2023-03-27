import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
// import { useHistory } from "react-router-dom";
import SearchBox from "./SearchBox";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Nav.Link href="/">
            <Navbar.Brand>PROSHOP</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav style={{ marginLeft: "auto" }}>
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart" /> Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <LinkContainer to="/profile">
                      <span>Profile</span>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin">
                  <NavDropdown.Item>
                    <LinkContainer to="/admin/userlist">
                      <span>Users</span>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <LinkContainer to="/admin/productlist">
                      <span>Products</span>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item

                  // onClick={() => history.push("/admin/orderlist")}
                  >
                    <LinkContainer to="/admin/orderlist">
                      <span>Orders</span>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/auth.action";
const Header = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(signout());
    };
    const renderLoggedInLinks = () => {
        return (
            <li className="nav-item">
                <span
                    className="nav-link"
                    onClick={logOut}
                    style={{ color: "royalblue", cursor: "pointer" }}
                >
                    Sign-Out
                </span>
            </li>
        );
    };
    const renderNonLoggedIn = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">
                        Sign-Up
                    </NavLink>
                </li>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">
                        Sign-In
                    </NavLink>
                </li>
            </Nav>
        );
    };
    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
                style={{ zIndex: "1" }}
            >
                <Container fluid>
                    <Link to="/" className="navbar-brand">
                        Admin Dashboard
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedIn()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
export default Header;

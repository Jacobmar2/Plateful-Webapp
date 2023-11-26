import {
    Navbar,
    Nav,
    Container,
    NavbarBrand,
    NavbarToggle,
} from "react-bootstrap";
import "./Header.css";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <Navbar fixed="top" expand="lg" collapseOnSelect className="navbar-dark p-0">
            <Container fluid="lg" className="p-0">
                <LinkContainer to={"/"}>
                    <NavbarBrand className="p-0 ps-3">PLATEFUL</NavbarBrand>
                </LinkContainer>
                <NavbarToggle className="ms-auto me-2 p-1" />

                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <NavLink
                            to={"SearchRecipes"}
                            className="d-flex align-items-center px-3 text-decoration-none"
                        >
                            RECIPES
                        </NavLink>
                        <NavLink
                            to={"searchproducts"}
                            className="d-flex align-items-center px-3 text-decoration-none"
                        >
                            PRODUCTS
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

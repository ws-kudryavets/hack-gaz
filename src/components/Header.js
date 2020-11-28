import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

const Header = () => (
    <div>
        <Navbar
            color="light"
            light
            expand="md"
        >
            <Nav
                className="ml-auto"
                navbar
            >
                <NavItem>
                    <NavLink href="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/regist"> Regist</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>


);
export default Header;

import React from 'react'
import Link from 'next/link'
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

import useAuth from '../lib/AuthContext';
import AuthenticatedMenu from './AuthenticatedMenu';
import UnauthenticatedMenu from './UnauthenticatedMenu';

const Navbar = () => {

    const { isAuthenticated } = useAuth()

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <Container>
                <Link href="/">
                    <a>
                        <BootstrapNavbar.Brand>Fridgy</BootstrapNavbar.Brand>
                    </a>
                </Link>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuthenticated ?
                            <AuthenticatedMenu /> :
                            <UnauthenticatedMenu />
                        }
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    )
}



export default Navbar
import Head from 'next/head'
import useAuth from "../lib/AuthContext"

import { Navbar, Nav } from 'react-bootstrap'

const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div style={{ marginBottom: '5%' }}>
            <Head>
                <title>Fridgy</title>
            </Head>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Fridgy</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {!isAuthenticated && <Nav.Link href="/login">Login</Nav.Link>}
                        {isAuthenticated && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
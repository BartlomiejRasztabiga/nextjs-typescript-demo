import Head from 'next/head'

import { Navbar, Nav } from 'react-bootstrap'

const Header = () => (
    <div style={{ marginBottom: '5%' }}>
        <Head>
            <title>Fridgy</title>
        </Head>
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Fridgy</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
)

export default Header
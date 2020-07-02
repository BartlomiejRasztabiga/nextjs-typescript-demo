import Head from 'next/head'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

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
                    <NavDropdown title='Test'>
                        <NavDropdown.Item href="/test">Test</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
)

export default Header
import { Nav } from 'react-bootstrap';

import { useAuth } from '../lib/AuthContext';
import NavbarLink from './NavbarLink';

const AuthenticatedMenu = () => {

    const { user, logout } = useAuth()

    return (
        <>
            <NavbarLink href={'/dashboard'} >
                Hello {user.email}
            </NavbarLink>
            <Nav.Item onClick={logout}>
                <a style={{ cursor: 'pointer' }} className="nav-link">
                    Logout
                </a>
            </Nav.Item>
        </>
    )
}

export default AuthenticatedMenu
import Link from 'next/link'

const NavbarLink = ({ href, children }) => (
    <Link href={href}>
        <a className="nav-link" >
            {children}
        </a>
    </Link>
)

export default NavbarLink
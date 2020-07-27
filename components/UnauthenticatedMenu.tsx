import NavbarLink from "./NavbarLink"

const UnauthenticatedMenu = () => (
    <>
        <NavbarLink href={'/login'} >
            Login
        </NavbarLink>

        <NavbarLink href={'/signup'} >
            Signup
        </NavbarLink>
    </>
)

export default UnauthenticatedMenu
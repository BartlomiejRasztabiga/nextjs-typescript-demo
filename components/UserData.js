import Head from 'next/head'

import { Navbar, Nav } from 'react-bootstrap'

const UserData = ({ user }) => {
    console.log(user)
    return (
        <div style={{ marginBottom: '5%' }}>
            <div>{user.name}</div>
        </div>
    )
}

export default UserData
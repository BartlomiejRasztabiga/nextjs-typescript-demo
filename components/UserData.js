import Head from 'next/head'

import { Navbar, Nav } from 'react-bootstrap'

const UserData = ({ user }) => {
    console.log(user)
    return (
        <div style={{ marginBottom: '5%' }}>
            <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

export default UserData
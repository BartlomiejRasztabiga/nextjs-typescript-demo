import Head from 'next/head'

import { Navbar, Nav } from 'react-bootstrap'

const GroceryItem = ({ groceryItem }) => {
    return (
        <div style={{ marginBottom: '5%' }}>
            <p>{groceryItem.name}   x   {groceryItem.quantity}</p>
        </div>
    )
}

export default GroceryItem
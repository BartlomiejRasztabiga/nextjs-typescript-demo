import Head from 'next/head'

import { Navbar, Nav } from 'react-bootstrap'
import GroceryItem from './GroceryItem'

const GroceryItemsList = ({ groceryItems }) => {
    return (
        <ul>
            {groceryItems.map(groceryItem => (
                <li>
                    <GroceryItem groceryItem={groceryItem} />
                </li>))}
        </ul>
    )
}

export default GroceryItemsList
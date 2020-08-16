import Head from 'next/head'

import { Navbar, Nav } from 'react-bootstrap'
import GroceryItem from './GroceryItem'

const GroceryItemsList = ({ groceryItems }) => {
    console.log(groceryItems)
    return (
        <ul>
            {groceryItems.map(groceryItem => (
                <li key={groceryItem._id}>
                    <GroceryItem groceryItem={groceryItem} />
                </li>))}
        </ul>
    )
}

export default GroceryItemsList
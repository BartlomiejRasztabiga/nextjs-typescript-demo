import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../lib/dbConnect'
import GroceryItem from '../../../models/GroceryItem'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()

    const groceryItems = await GroceryItem.find();

    res.status(200).json(groceryItems)
}
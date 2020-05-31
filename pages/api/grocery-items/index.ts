import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../lib/dbConnect'
import HttpMethod from '../../../utils/HttpMethod'
import GroceryItemService from '../../../services/GroceryItemService'

const groceryItemService = new GroceryItemService()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()

    switch (req.method) {
        case HttpMethod.POST:
            await onPost(req, res)
            break
        case HttpMethod.GET:
            await onGet(req, res)
            break
        default:
            res.status(405)
            break
    }
}

const onPost = async (req: NextApiRequest, res: NextApiResponse) => {
    const newGroceryItem = await groceryItemService.createNewGroceryItem(req.body)

    res.status(201).json(newGroceryItem)
}

const onGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const groceryItems = await groceryItemService.getAllGroceryItems()

    res.status(200).json(groceryItems)
}
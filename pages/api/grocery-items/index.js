import nextConnect from 'next-connect';

import GroceryItemService from '../../../services/GroceryItemService'

import middleware from '../../../middlewares/middleware';

const groceryItemService = new GroceryItemService()
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    console.log(req.user)
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }

    const groceryItems = await groceryItemService.getAll()

    res.status(200).json(groceryItems)
});

handler.post(async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }

    const newGroceryItem = await groceryItemService.createNew(req.body)

    res.status(201).json(newGroceryItem)
});


export default handler;
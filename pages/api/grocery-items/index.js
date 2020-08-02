import nextConnect from 'next-connect';
import passport from '../../../lib/passport';

import GroceryItemService from '../../../services/GroceryItemService'

import middleware from '../../../middlewares/middleware';

const groceryItemService = new GroceryItemService()
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(403).send(info.message);
        } else {
            const groceryItems = await groceryItemService.getAll()

            res.status(200).json(groceryItems)
        }
    })(req, res);
});

handler.post(async (req, res) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(403).send(info.message);
        } else {
            const newGroceryItem = await groceryItemService.createNew(req.body)

            res.status(201).json(newGroceryItem)
        }
    })(req, res);

    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
});


export default handler;
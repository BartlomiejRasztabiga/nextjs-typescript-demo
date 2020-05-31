import { GroceryItem } from "../../models"

export default async (req, res) => {
    console.log(process.env.MONGO_URL)
    const groceryItems = await GroceryItem.find();

    res.status(200).json(groceryItems)
}
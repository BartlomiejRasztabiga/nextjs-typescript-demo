import { GroceryItem } from "../../models"

export default async (req, res) => {
    const groceryItems = await GroceryItem.find();

    res.status(200).json(groceryItems)
}
require("../../database");
require("../../models/all");

import mongoose from 'mongoose'

const GroceryItem = mongoose.model("GroceryItem")

export default async (req, res) => {
    const groceryItems = await GroceryItem.find();

    res.status(200).json(groceryItems)
}
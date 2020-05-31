require("../../database");
require("../../models/all");
// import { GroceryItem } from "../../models/grocery_item"
import mongoose from 'mongoose'

const GroceryItem = mongoose.model("GroceryItem")

export default async (req, res) => {
    console.log(process.env.MONGO_URL)
    const groceryItems = await GroceryItem.find();

    res.status(200).json(groceryItems)
    // res.status(200).json({mongo_url: process.env.MONGO_URL})
}
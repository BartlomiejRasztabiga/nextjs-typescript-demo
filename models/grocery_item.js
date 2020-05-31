const { Schema, model } = require("mongoose")

const groceryItemSchema = new Schema({
    name: { type: String },
    description: { type: String },
    quantity: { type: Number }
})

module.exports = model("GroceryItem", groceryItemSchema)
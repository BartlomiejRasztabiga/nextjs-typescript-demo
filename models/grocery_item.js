const { Schema, model } = require("mongoose")

console.log('in database grocery_item.js')

const groceryItemSchema = new Schema({
    name: { type: String },
    description: { type: String },
    quantity: { type: Number }
})

module.exports = model("GroceryItem", groceryItemSchema)
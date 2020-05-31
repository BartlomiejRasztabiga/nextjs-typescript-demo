import mongoose from 'mongoose'

const GroceryItemSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    quantity: { type: Number }
})

export default mongoose.models.GroceryItem || mongoose.model('GroceryItem', GroceryItemSchema)
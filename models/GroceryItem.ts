import mongoose, { Schema, Document } from 'mongoose'

export interface IGroceryItem extends Document {
    name: string;
    description: string;
    quantity: number;
}

const GroceryItemSchema: Schema = new Schema({
    name: { type: String },
    description: { type: String },
    quantity: { type: Number }
})

export default mongoose.models.GroceryItem || mongoose.model<IGroceryItem>('GroceryItem', GroceryItemSchema)
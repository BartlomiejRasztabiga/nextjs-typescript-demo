import mongoose, { Schema, Document } from 'mongoose'

export interface IGroceryItem {
    name: string;
    description: string;
    quantity: number;
}

export interface GroceryItemDocument extends Document, IGroceryItem {

}

const GroceryItemSchema: Schema = new Schema({
    name: { type: String },
    description: { type: String },
    quantity: { type: Number }
})

export default mongoose.models.GroceryItem || mongoose.model<GroceryItemDocument>('GroceryItem', GroceryItemSchema)
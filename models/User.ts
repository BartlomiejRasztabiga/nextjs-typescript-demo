import mongoose, { Schema, Document } from 'mongoose'

export interface IUser {
    email: string,
    password: string
}

export interface UserDocument extends Document, IUser { }

const UserSchema: Schema = new Schema({
    email: { type: String },
    password: { type: String }
})

export default mongoose.models.GroceryItem || mongoose.model<UserDocument>('User', UserSchema)
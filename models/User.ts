import mongoose, { Schema, Document } from 'mongoose'

export interface IUser {
    email: string,
    password: string
}

export interface UserDocument extends Document, IUser { }

const UserSchema: Schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema)
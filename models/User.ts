import mongoose, { Schema, Document } from 'mongoose'

export interface IUser {
    email: string,
    password: string,
    name: string
}

export interface ICreateUser {
    email: string,
    password: string,
    name: string
}

export interface UserDocument extends Document, IUser { }

const UserSchema: Schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String }
})

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema)
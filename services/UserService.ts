import User, { IUser } from '../models/User'


export default class UserService {
    async getUserByEmail(email: String): Promise<IUser> {
        return await User.findOne({ email })
    }

    async getUserById(_id: String): Promise<IUser> {
        return await User.findOne({ _id })
    }

    async createNew(user: IUser) {
        return await User.create(user)
    }
}
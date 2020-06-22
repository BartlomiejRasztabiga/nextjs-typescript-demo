import User, { IUser } from '../models/User'

let instance;

export default class UserService {

    private constructor() { }

    static getInstance() {
        if (!instance) {
            console.log('creating new userservice instance')
            instance = new UserService();
        }
        return instance;
    }

    async getUserByEmail(email: String): Promise<IUser> {
        return await User.findOne({ email })
    }

    async getUserById(_id: String): Promise<IUser> {
        return await User.findOne({ _id })
    }

    async createNew(user: IUser) {
        return await User.create(user)
    }

    async updateUserByEmail(email: String, updated: IUser) {
        return await User.updateOne({ email }, updated)
    }
}
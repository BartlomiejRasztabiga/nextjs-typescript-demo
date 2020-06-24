import User, { IUser, ICreateUser } from '../models/User'

let instance: UserService;

export default class UserService {

    private constructor() { }

    static getInstance() {
        if (!instance) {
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

    async createNew(user: ICreateUser) {
        return await User.create(user)
    }

    async updateUserByEmail(email: String, updated: IUser) {
        let user = await User.findOne({ email })
        user.email = updated.email;
        user.name = updated.name;
        return await user.save()
    }
}
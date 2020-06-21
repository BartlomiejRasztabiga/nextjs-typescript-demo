import UserService from '../services/UserService'
import { connect, close, clear } from '../lib/dbTestUtils'
import { IUser } from '../models/User'

beforeAll(async () => await connect())

afterEach(async () => await clear())

afterAll(async () => await close())

describe('UserServiceTest', () => {
    let userService = new UserService()

    test("it should save new user and return it while findById", async () => {
        let newly_created_user = await userService.createNew(example_user)
        let returned_user = await userService.getUserById(newly_created_user._id)
        expect(returned_user.email).toBe(example_user.email) 
        //no _id on IUser, but it exists on UserDocument
        //TODO find out how should I handle that situation
    })
})

const example_user: IUser = {
    email: "test@test.com",
    password: "secret_hash"
}
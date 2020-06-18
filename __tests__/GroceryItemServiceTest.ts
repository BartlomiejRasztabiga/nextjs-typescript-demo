import dbConnect from '../lib/dbConnect'
import GroceryItemService from '../services/GroceryItemService'
import { connect, close, clear } from '../lib/dbTestUtils'
import { IGroceryItem } from '../models/GroceryItem'

beforeAll(async () => await connect())

afterEach(async () => await clear())

afterAll(async () => await close())

describe('GroceryItemServiceTest', () => {
    let groceryItemService = new GroceryItemService()

    test("it should save new grocery item", async () => {
        await groceryItemService.createNew(example_grocery_item)
        let groceryItems = await groceryItemService.getAll()
        expect(groceryItems.length).toBe(1)
    })
})

const example_grocery_item: IGroceryItem = {
    name: "test",
    description: "desc",
    quantity: 1
}
import GroceryItem, { IGroceryItem } from '../models/GroceryItem'


export default class GroceryItemService {
    async getAll(): Promise<IGroceryItem[]> {
        return await GroceryItem.find({})
    }

    async createNew(groceryItem: IGroceryItem) {
        return await GroceryItem.create(groceryItem)
    }
}
import GroceryItem, { IGroceryItem } from '../models/GroceryItem'


export default class GroceryItemService {
    async getAllGroceryItems(): Promise<IGroceryItem[]> {
        return await GroceryItem.find({})
    }

    async createNewGroceryItem(groceryItem: IGroceryItem) {
        return await GroceryItem.create(groceryItem)
    }
}
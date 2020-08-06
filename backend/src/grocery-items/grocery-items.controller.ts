import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroceryItemsService } from './grocery-items.service';
import { CreateGroceryItemDto } from './dto/create-grocery-item.dto';
import { GroceryItem } from './schemas/grocery-item.schema';

@Controller('grocery-items')
export class GroceryItemsController {
    constructor(private readonly groceryItemsService: GroceryItemsService) { }

    @Post()
    async create(@Body() createGroceryItemDto: CreateGroceryItemDto) {
        await this.groceryItemsService.create(createGroceryItemDto);
    }

    @Get()
    async getAll(): Promise<GroceryItem[]> {
        return this.groceryItemsService.findAll();
    }
}
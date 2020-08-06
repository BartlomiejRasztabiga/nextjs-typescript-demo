import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroceryItemsController } from './grocery-items.controller';
import { GroceryItemsService } from './grocery-items.service';
import { GroceryItem, GroceryItemSchema } from './schemas/grocery-item.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: GroceryItem.name, schema: GroceryItemSchema }])],
    controllers: [GroceryItemsController],
    providers: [GroceryItemsService],
})
export class GroceryItemsModule { }
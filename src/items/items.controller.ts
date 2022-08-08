import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Logger,
  } from '@nestjs/common';
import { ObjectId } from 'mongodb';
  
  import { ItemsService } from './items.service';
  
  @Controller('items')
  export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}
  
    @Post()
    async addItem(
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
      @Body('category') prodCategory: ObjectId,

      ) {
      const generatedItem = await this.itemsService.insertItem(
        prodTitle,
        prodDesc,
        prodPrice,
        prodCategory
      );
      JSON.stringify(generatedItem)
      Logger.log('hhzdbuzdbuyhzdbu')
      Logger.log(prodCategory)

      return { item: generatedItem };
    }
  
    @Get()
    async getAllItems() {
      const items = await this.itemsService.getItems();
      return items;
    }

    @Get('/bycategories/:id')
    async getAllItemsByCategories(@Param('id') categoryId: string) {
      const items = await this.itemsService.findItemsByCategory(categoryId);
      return items;
    }
  
    @Get(':id')
    getItem(@Param('id') prodId: string) {
      return this.itemsService.getSingleItem(prodId);
    }
  
    @Patch(':id')
    async updateItem(
      @Param('id') prodId: string,
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
      @Body('category') prodCategory: ObjectId,

    ) {
      const updatedItem = await this.itemsService.updateItem(prodId, prodTitle, prodDesc, prodPrice , prodCategory);
      return {id : updatedItem.id , title : updatedItem.title , description : updatedItem.description , price : updatedItem.price , category : updatedItem.category };
    }
  
    @Delete(':id')
    async removeItem(@Param('id') prodId: string) {
        await this.itemsService.deleteItem(prodId);
        return null;
    }
  }
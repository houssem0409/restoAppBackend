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
  
  import { CategoriesService } from './categories.service';
  
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Post()
    async addCategory(
      @Body('name') Name: string,
    
    ) {
      Logger.log(Name)
      const generatedCategory = await this.categoriesService.insertCategory(
        Name
      );
      return  generatedCategory ;
    }
  
    @Get()
    async getAllCategories() {
      const categories = await this.categoriesService.getCategories();
      return categories;
    }
  
    @Get(':id')
    getCategory(@Param('id') CategoryId: string) {
      return this.categoriesService.getSingleCategory(CategoryId);
    }
  
    @Patch(':id')
    async updateCategory(
      @Param('id') CategoryId: string,
      @Body('name') name: string,
  
    ) {
      await this.categoriesService.updateCategory(CategoryId,  name );
      return null;
    }
  
    @Delete(':id')
    async removeCategory(@Param('id') CategoryId: string) {
        await this.categoriesService.deleteCategory(CategoryId);
        return null;
    }
  }
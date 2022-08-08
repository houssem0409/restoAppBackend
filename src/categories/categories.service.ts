import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertCategory(name: string) {
    Logger.log(name)
    const newCategory = new this.categoryModel({
      name
     
    });
    Logger.log(newCategory)
    Logger.log('result')
    
    const result = await newCategory.save();
    const categ = new this.categoryModel()
  
    Logger.log(result)
    Logger.log('result')

    return {id : result._id , name : result.name};
  }

  async getCategories() {
    const categories = await this.categoryModel.find().exec();
    return categories.map(Category => ({
      id: Category.id,
      name: Category.name
  
    }));
  }

  async getSingleCategory(categoryId: string) {
    const category = await this.findCategory(categoryId);
    return {
      id: category.id,
      title: category.name
     
    };
  }

  async updateCategory(
    categoryId: string,
    name: string,
  
  ) {
    const updatedCategory = await this.findCategory(categoryId);
    if (name) {
      updatedCategory.name = name;
    }

    updatedCategory.save();
  }

  async deleteCategory(categoryId: string) {
    const result = await this.categoryModel.deleteOne({_id: categoryId}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find Category.');
    }
  }

  private async findCategory(id: string): Promise<Category> {
    let category;
    try {
      category = await this.categoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Category.');
    }
    if (!category) {
      throw new NotFoundException('Could not find Category.');
    }
    return category;
  }
}
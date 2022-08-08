import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger, ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<Item>,
  ) {}

  async insertItem(title: string, desc: string, price: number , category : ObjectId) {
    const newItem = new this.itemModel({
      title,
      description: desc,
      price,
      category
    });
    
    const result = await newItem.save();
    return result;
  }

  async getItems() {
    const items = await this.itemModel.find().exec();
    return items.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      category : prod.category
    }));
  }

  async getSingleItem(itemId: string) {
    const item = await this.findItem(itemId);
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      category : item.category
    };
  }
   async findItemsByCategory(category : any): Promise<any> {
    let items ;
    try {
      items = await this.itemModel.find({category}).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!items) {
      throw new NotFoundException('Could not find user.');
    }
    return items;
  }

  async updateItem(
    itemId: string,
    title: string,
    desc: string,
    price: number,
    category : ObjectId
  ) {
    const updatedItem = await this.findItem(itemId);
    if (title) {
      updatedItem.title = title;
    }
    if (desc) {
      updatedItem.description = desc;
    }
    if (price) {
      updatedItem.price = price;
    }
    if (category) {
      updatedItem.category = category;
    }
    updatedItem.save();
    return updatedItem
  }

  async deleteItem(prodId: string) {
    const result = await this.itemModel.deleteOne({_id: prodId}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find item.');
    }
  }

  private async findItem(id: string): Promise<Item> {
    let item;
    try {
      item = await this.itemModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find item.');
    }
    if (!item) {
      throw new NotFoundException('Could not find item.');
    }
    return item;
  }
}
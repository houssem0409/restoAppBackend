import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filter, last } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async insertUser(name: string, lastname: string, age: number , email : string , password : string) {
    const newUser = new this.userModel({
      name,
      lastname,
      age,
      email,
      password,
    });
    const result = await newUser.save();
    return result;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(prod => ({
      id: prod.id,
      name: prod.name,
      lastname: prod.lastname,
      age: prod.age,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      age: user.age,
    };
  }
  async getSingleUserByEmail(email: any) {
    const user = await this.findUserByEmail(email);
    return user;
  }

  async updateUser(
    userId: string,
    name: string,
    lastname: string,
    age: number,
    email : string,
    password: string,
  ) {
    const updatedUser = await this.findUser(userId);
    if (name) {
      updatedUser.name = name;
    }
    if (lastname) {
      updatedUser.lastname = lastname;
    }
    if (age) {
      updatedUser.age = age;
    }
    if (email) {
        updatedUser.email = email;
      }
      if (password) {
        updatedUser.password = password;
      }
    updatedUser.save();
  }

  async deleteUser(prodId: string) {
    const result = await this.userModel.deleteOne({_id: prodId}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find item.');
    }
    if (!user) {
      throw new NotFoundException('Could not find item.');
    }
    return user;
  }
  private async findUserByEmail(email : any): Promise<User> {
    let user;
    try {
      user = await this.userModel.find({email}).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
  async signup(name: string, lastname: string, age: number) {
    const newUser = new this.userModel({
      name,
      lastname,
      age,
    });
    const result = await newUser.save();
    return result.id as string;
  }
 
  async sigoutService() {
  
    return "signout success";
  }
 
}
import * as mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

export const ItemSchema = new mongoose.Schema({
  title: { type: String, },
  description: { type: String,},
  price: { type: Number,  },
  category: {
    type: ObjectId,
    ref: 'Category',
    default: null,
  },
});

export interface Item extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
  category : ObjectId;
}
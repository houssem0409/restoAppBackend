import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String , required: true },
  password: { type: String , required: true }
});

export interface User extends mongoose.Document {
  name: string;
  lastname: string;
  age: number;
  email: string;
  password : string;

}
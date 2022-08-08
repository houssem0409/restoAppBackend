import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Logger,
    ConsoleLogger,
  } from '@nestjs/common';
import path from 'path';
import jwt_decode from "jwt-decode";


  import { UsersService } from './users.service';
  var jwt = require('jsonwebtoken');
  const {bcrypt , hashSync , compareSync} = require('bcrypt')
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    async addUser(
      @Body('name') prodName: string,
      @Body('lastname') prodLast: string,
      @Body('age') prodAge: number,
      @Body('email') prodEmail : string,
      @Body('password') prodPassword : string
    ) {
      const generatedId = await this.usersService.insertUser(
        prodName,
        prodLast,
        prodAge,
        prodEmail,
        hashSync(prodPassword , 10),    

      );
      JSON.stringify(generatedId)
      Logger.log('hello')
      return { user: generatedId };
    }
    @Post('/signin')
    async signin(

      @Body('email') prodEmail : string,
      @Body('password') prodPassword : string
    ) {
        const user = await this.usersService.getSingleUserByEmail(prodEmail)
        Logger.log(user)
        
        if(!user[0]){
            return  ({
              success: false,
              message: 'email introuvable  ! ',
            })
        }
        if (!compareSync(prodPassword, user[0].password)) {
            return ({
              success: false,
              message: 'Incoorect Password  ! ',
            })
          }
          const payload = {
            id : user[0]._id,
            name: user[0].name,
            lastname: user[0].lastname,
    
          }
          const token = jwt.sign(payload, 'Random String', { expiresIn: '90m' })
          Logger.log("yess");
          

  
      return { user: user[0] , token : token };
    }
  
    @Get()
    async getAllUsers() {
      const users = await this.usersService.getUsers();
      return users;
    }
  
    @Post('/userInfo')
    async getUserInfo( 
       @Body('token') token : string
    ) {
      var decoded = {
        id : String,
        name : String,
        lastname : String,
        iat : Number

      }
      console.log('I am here')
      Logger.log(token)
      console.log('yes')
    
      decoded = jwt_decode(token)
    
      console.log('this is ')
      console.log(decoded.id)
      var id : any
      id = decoded.id
      return this.usersService.getSingleUser(id);
    }
  
    @Get(':id')
    getUser(@Param('id') prodId: string) {
      return this.usersService.getSingleUser(prodId);
    }
  
    @Patch(':id')
    async updateUser(
      @Param('id') prodId: string,
      @Body('name') prodName: string,
      @Body('lastname') prodLast: string,
      @Body('age') prodAge: number,
      @Body('email') prodEmail: string,
      @Body('password') prodPassword: string,

      ) {
      await this.usersService.updateUser(prodId, prodName, prodLast, prodAge , prodEmail , prodPassword);
      return null;
    }
  
    @Delete(':id')
    async removeUser(@Param('id') prodId: string) {
        await this.usersService.deleteUser(prodId);
        return null;
    }
  @Get('/signout')
  async signout(){

    Logger.log('yesss')
    
   const msg = await this.usersService.sigoutService()
   return msg
  }
  }
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ItemsModule} from './items/items.module';
import {UsersModule} from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
@Module({
  imports: [ItemsModule , UsersModule , CategoriesModule , MongooseModule.forRoot('mongodb://localhost:27017/resto-app')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

import { UserService } from '../user/user.service';
import { Post } from './model/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}

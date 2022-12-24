import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './model/post.entity';
import { PostRepository } from './model/post.repository';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: PostRepository,
        private readonly userService: UserService,
    ){}

    async createPost(post: CreatePostDto) {
        const user = await this.userService.getOneUserById(post.authorId);

        if (!user) throw new NotFoundException('User not found.');

        const createPost = this.postRepository.create(post);
        return this.postRepository.save(createPost);
    }

    async getPosts() {
      return this.postRepository.find({
        relations: ['author'],
      });
    }
}

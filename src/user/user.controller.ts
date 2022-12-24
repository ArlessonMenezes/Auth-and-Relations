import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get() 
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':username')
  async getOneUser(@Param('username') username: string) {
    return this.userService.getOneUser(username);
  }

  @Get(':id')
  async getOneUserById(@Param('id') id: number) {
    return this.userService.getOneUserById(id);
  }

  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    return this.userService.deleteUser(username);
  }

  @Patch(':id') 
  async updateUser(
    @Param('id') id: number, 
    @Body() userUpdateDto: UpdateUserDto) {
    return this.userService.updateUSer(id, userUpdateDto);
  }
}

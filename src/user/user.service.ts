import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './model/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ){}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ username: createUserDto.username })

    if (user) throw new BadRequestException('User already exist.');

    const newUser = this.userRepository.create(createUserDto);

    await this.userRepository.save(newUser);

    const { password, ...userCreated } = newUser;

    return userCreated;
  }

  async getUsers() {
    const users = await this.userRepository.find({
      relations: ['posts', 'profile']
    }); 

    return users;
  }

  async getOneUser(username: string) {
    const user = await this.userRepository.findOne({ 
      where: { username }, 
      relations: ['posts', 'profile'] 
    });

    if (!user) throw new NotFoundException('User does not found.');

    const { password, ...getUser } = user;

    return getUser;
  }

  async getOneUserById(id: number) {
    const user = await this.userRepository.findOne({ 
      where: { id }, 
      relations: ['posts', 'profile'] 
    });

    if (!user) throw new NotFoundException('User does not found.');
    
    const { password, ...getUser } = user;

    return getUser;
  }

  async deleteUser(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException('User does not found.');

    await this.userRepository.remove(user);
  }

  async updateUSer(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) throw new NotFoundException('User does not found.');

    const userUpdate = Object.assign(user, updateUserDto);

    return this.userRepository.save(userUpdate);
  }
}

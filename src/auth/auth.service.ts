import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/model/user.entity';
import { UserRepository } from 'src/user/model/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ){}

  async login(data: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ username: data.username });

    if (!user) throw new NotFoundException('Username or Password invalid.');

    const confirmedPassword = await compare(data.password, user.password);

    if (!confirmedPassword) throw new NotFoundException('Username or Password invalid.');

    const payload = { username: user.username, sub: user.id };
    
    const token = sign({ payload }, 'secretpasswordtestapplicationapi' ?? '')

    const { password:_, ...userLogin } = user;

    return {
      user: userLogin, 
      access_token: token 
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/model/user.entity';

import { UserRepository } from '../user/model/user.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './model/profile.entity';
import { ProfileRepository } from './model/profile.repository';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: ProfileRepository,
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
    ){}

    async createProfile(idUser: number, profile: CreateProfileDto) {
        const user = await this.userRepository.findOneBy({ id: idUser })

        if (!user) throw new NotFoundException('User not found.');

        const newProfile = this.profileRepository.create(profile)

        const saveProfile = await this.profileRepository.save(newProfile)

        user.profile = saveProfile

        return this.userRepository.save(user);
    }
}

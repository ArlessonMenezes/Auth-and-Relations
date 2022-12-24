import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ){}

    @Post(':idUser')
    async createProfile(
        @Param('idUser', ParseIntPipe) idUser: number,
        @Body() profile: CreateProfileDto,
    ) {
        return this.profileService.createProfile(idUser, profile);
    }
}

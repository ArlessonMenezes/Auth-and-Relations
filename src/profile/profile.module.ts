import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/model/user.entity';
import { UserModule } from 'src/user/user.module';
import { Profile } from './model/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ Profile, User ]), 
    ],
    providers: [ProfileService],
    controllers: [ProfileController]
})
export class ProfileModule {}

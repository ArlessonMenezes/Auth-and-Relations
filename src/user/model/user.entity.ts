import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  PrimaryGeneratedColumn, 
  BeforeInsert, 
  OneToOne, 
  JoinColumn, 
  OneToMany
} from "typeorm";

import { hashSync } from 'bcrypt';
import { Profile } from "src/profile/model/profile.entity";
import { Post } from "src/post/model/post.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 8);
  }

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}
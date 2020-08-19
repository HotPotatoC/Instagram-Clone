import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'follows' })
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne((type) => User, (user) => user.followers)
  followedBy!: User;

  @ManyToOne((type) => User, (user) => user.followings)
  followedTo!: User;
}

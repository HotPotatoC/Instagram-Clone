import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User, Post } from '.';

@Entity({ name: 'likes' })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne((type) => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne((type) => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  post!: Post;
}

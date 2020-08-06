import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Post } from './post';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ type: 'varchar', length: 300 })
  content!: string;

  @ManyToOne((type) => User, (user) => user.comments)
  user!: User;

  @ManyToOne((type) => Post, (post) => post.comments)
  post!: Post;
}

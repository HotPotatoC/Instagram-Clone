import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user';
import { Post } from './post';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300 })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne((type) => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne((type) => Post, (post) => post.comments)
  post!: Post;
}

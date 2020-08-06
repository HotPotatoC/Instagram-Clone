import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user';
import { Comment } from './comment';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ type: 'varchar' })
  image!: string;

  @Column({ type: 'varchar', length: 300 })
  caption!: string;

  @Column({ type: 'varchar', default: '' })
  location?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne((type) => User, (user) => user.posts)
  user!: User;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments!: Comment[];
}

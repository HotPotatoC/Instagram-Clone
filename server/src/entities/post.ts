import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User, Comment, Like } from '.';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  image!: string;

  @Column({ type: 'varchar', length: 300 })
  caption!: string;

  @Column({ type: 'varchar', default: '' })
  location?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne((type) => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @OneToMany((type) => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments!: Comment[];

  @OneToMany((type) => Like, (like) => like.post, {
    cascade: true,
  })
  likes!: Like[];
}

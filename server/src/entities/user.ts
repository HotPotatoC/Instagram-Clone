import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import { Post, Comment, Like } from '.';
import { Follow } from './follow';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: '' })
  displayName?: string;

  @Column({ type: 'varchar', unique: true, length: 32 })
  username!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar', select: false })
  password!: string;

  @Column({ default: '' })
  avatarImg?: string;

  @Column({ type: 'text', default: '' })
  bio?: string;

  @Column({ type: 'varchar', default: '' })
  website?: string;

  @Column({ type: 'varchar', default: '' })
  location?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany((type) => Post, (post) => post.user, {
    cascade: true,
  })
  posts!: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments!: Comment[];

  @OneToMany((type) => Like, (like) => like.user, {
    cascade: true,
  })
  likes!: Like[];

  @OneToMany((type) => Follow, (follow) => follow.followedBy, {
    cascade: true,
  })
  followers!: Follow[];

  @OneToMany((type) => Follow, (follow) => follow.followedTo, {
    cascade: true,
  })
  followings!: Follow[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

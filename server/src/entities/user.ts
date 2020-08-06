import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import { Post } from './post';
import { Comment } from './comment';

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

  @OneToMany((type) => Post, (post) => post.user)
  posts!: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments!: Comment[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

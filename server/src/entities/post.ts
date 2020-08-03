import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ type: 'varchar' })
  img!: string;

  @Column({ type: 'varchar', length: 300 })
  caption!: string;

  @Column({ type: 'varchar' })
  location!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}

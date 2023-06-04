import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';
import { Comment, Favorite, User } from './';

@Entity({
  schema: DatabaseSchema.Article,
})
export class Article extends BaseEntity {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column('text', { array: true })
  tags: string[];

  @ManyToOne(() => User, (user) => user.articles, {
    onDelete: 'CASCADE'
  })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.article, {
    cascade: true,
  })
  favorites: Favorite[];

  @Column({
    unique: true,
  })
  slug: string;
}

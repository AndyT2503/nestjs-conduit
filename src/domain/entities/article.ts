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

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.article)
  favorites: Favorite[];

  @Column({
    unique: true,
  })
  slug: string;
}

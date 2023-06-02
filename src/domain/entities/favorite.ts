import { Entity, ManyToOne } from 'typeorm';
import { Article, User } from '.';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';

@Entity({
  schema: DatabaseSchema.Article,
})
export class Favorite extends BaseEntity {
  @ManyToOne(() => Article, (article) => article.favorites)
  article: Article;

  @ManyToOne(() => User, (user) => user.favorites)
  author: User;
}

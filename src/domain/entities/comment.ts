import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';
import { Article, User } from './';

@Entity({
  schema: DatabaseSchema.Article,
})
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @Column()
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;
}

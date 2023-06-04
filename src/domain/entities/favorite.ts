import { Entity, ManyToOne } from 'typeorm';
import { Article, User } from '.';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';

@Entity({
  schema: DatabaseSchema.Article,
})
export class Favorite extends BaseEntity {
  @ManyToOne(() => Article, (article) => article.favorites, {
    onDelete: 'CASCADE',
    orphanedRowAction: "delete"
  })
  article: Article;

  @ManyToOne(() => User, (user) => user.favorites, {
    onDelete: 'CASCADE',
    orphanedRowAction: "delete"
  })
  author: User;
}

import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';
import { Article, Follow, Comment, Favorite } from './';

@Entity({
  schema: DatabaseSchema.User,
})
export class User extends BaseEntity {
  
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    nullable: true
  })
  bio: string;

  @Column({
    nullable: true
  })
  image: string;

  @Column()
  password: string;

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followings: Follow[];

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.author)
  favorites: Favorite[];
}

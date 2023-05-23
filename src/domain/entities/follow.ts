import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';
import { User } from './';

@Entity({
  schema: DatabaseSchema.user,
})
export class Follow extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @ManyToOne(() => User, (user) => user.followings)
  following: User;
}

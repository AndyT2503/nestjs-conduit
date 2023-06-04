import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common';
import { DatabaseSchema } from '../const';
import { User } from './';

@Entity({
  schema: DatabaseSchema.User,
})
export class Follow extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers, {
    onDelete: 'CASCADE',
    orphanedRowAction: "delete"
  })
  follower: User;

  @ManyToOne(() => User, (user) => user.followings, {
    onDelete: 'CASCADE',
    orphanedRowAction: "delete"
  })
  following: User;
}

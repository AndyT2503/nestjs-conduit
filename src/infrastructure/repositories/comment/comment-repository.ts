import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { BaseRepository } from '../common';

@Injectable({
  scope: Scope.REQUEST,
})
export class CommentRepository extends BaseRepository<Comment> {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {
    super(commentRepository);
  }
}

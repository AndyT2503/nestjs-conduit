import { BaseRepository } from '../common';
import { Comment } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { Scope } from '@nestjs/common';

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

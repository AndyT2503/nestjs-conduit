import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { BaseRepository } from '../common/base-repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class ArticleRepository extends BaseRepository<Article> {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {
    super(articleRepository);
  }
}

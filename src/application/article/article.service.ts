import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Article, User } from 'src/domain/entities';
import { IRepository } from 'src/domain/repository/repository.interface';
import { AuthService } from 'src/infrastructure/auth';
import { ArticleDto, UpsertArticleDto } from './dto';
import { generateSlug } from '../utils';
import { RepositoryInjectionToken } from 'src/domain/repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class ArticleService {
  constructor(
    @Inject(RepositoryInjectionToken.User)
    private userRepository: IRepository<User>,
    @Inject(RepositoryInjectionToken.Article)
    private articleRepository: IRepository<Article>,
    private authService: AuthService,
  ) {}

  async createArticle(request: UpsertArticleDto): Promise<ArticleDto> {
    const author = await this.userRepository.findOne({
      where: {
        id: this.authService.getCurrentUser()!.id,
      },
      select: ['bio', 'image', 'username'],
    });
    if (!author) {
      throw new UnauthorizedException(['Unauthorized']);
    }
    const newArticle = await this.articleRepository.save({
      author: {
        id: this.authService.getCurrentUser()!.id,
      },
      body: request.body,
      description: request.description,
      tags: request.tagList,
      title: request.title,
      slug: generateSlug(request.title),
    });
    return {
      author: {
        bio: author.bio,
        following: false,
        image: author.image,
        username: author.username,
      },
      slug: newArticle.slug,
      body: newArticle.body,
      createdAt: newArticle.createdAt,
      description: newArticle.description,
      favoritesCount: 0,
      favorited: false,
      tagList: newArticle.tags,
      title: newArticle.title,
      updatedAt: newArticle.updatedAt,
    };
  }

  async updateArticle(
    slug: string,
    request: UpsertArticleDto,
  ): Promise<ArticleDto> {
    const author = await this.userRepository.findOne({
      where: {
        id: this.authService.getCurrentUser()!.id,
      },
    });
    if (!author) {
      throw new UnauthorizedException(['Unauthorized']);
    }
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
        author: {
          id: author.id,
        },
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    article.body = request.body;
    article.description = request.description;
    article.tags = request.tagList;
    article.title = request.title;
    article.slug = generateSlug(request.title);
    await this.articleRepository.save(article);
    const updateArticle = (await this.articleRepository.findOne({
      where: {
        id: article.id,
      },
      relations: ['favorites', 'favorites.author'],
    }))!;
    return {
      author: {
        bio: author.bio,
        following: false,
        image: author.image,
        username: author.username,
      },
      slug: updateArticle.slug,
      body: updateArticle.body,
      createdAt: updateArticle.createdAt,
      description: updateArticle.description,
      favoritesCount: updateArticle.favorites.length,
      tagList: updateArticle.tags,
      title: updateArticle.title,
      updatedAt: updateArticle.updatedAt,
      favorited: updateArticle.favorites.some((x) => x.author.id === author.id),
    };
  }

  async deleteArticle(slug: string): Promise<void> {
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
        author: {
          id: this.authService.getCurrentUser()!.id,
        },
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    await this.articleRepository.delete({
      id: article.id,
    });
  }
}

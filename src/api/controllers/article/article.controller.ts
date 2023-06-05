import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ArticleDto,
  ArticleQueryParamsDto,
  ArticleService,
  CommentDto,
  CreateCommentDto,
  UpsertArticleDto,
} from 'src/application/article';
import { PagingDto, PagingQueryParamsDto } from 'src/application/common';
import { AuthGuard } from 'src/infrastructure/auth';
import { ExceptionDto } from 'src/infrastructure/exceptions';

@ApiResponse({
  status: 422,
  description: 'Unexpected Error',
  type: ExceptionDto,
})
@ApiTags('article')
@Controller({
  path: 'article',
})
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  async createArticle(@Body() request: UpsertArticleDto): Promise<ArticleDto> {
    return await this.articleService.createArticle(request);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Put(':slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() request: UpsertArticleDto,
  ): Promise<ArticleDto> {
    return await this.articleService.updateArticle(slug, request);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @Delete(':slug')
  async deleteArticle(@Param('slug') slug: string): Promise<void> {
    await this.articleService.deleteArticle(slug);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Post(':slug/favorite')
  async favoriteArticle(@Param('slug') slug: string): Promise<ArticleDto> {
    return await this.articleService.favoriteArticle(slug);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Delete(':slug/favorite')
  async unFavoriteArticle(@Param('slug') slug: string): Promise<ArticleDto> {
    return await this.articleService.unFavoriteArticle(slug);
  }

  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit number of articles returned (default is 20)',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    description: 'Offset/skip number of articles (default is 0)',
    required: false,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: PagingDto<ArticleDto>,
  })
  @UseGuards(AuthGuard)
  @Get('feed')
  async getFeed(
    @Query() query?: PagingQueryParamsDto,
  ): Promise<PagingDto<ArticleDto>> {
    return await this.articleService.getFeed(query);
  }

  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit number of articles returned (default is 20)',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    description: 'Offset/skip number of articles (default is 0)',
    required: false,
  })
  @ApiQuery({
    name: 'author',
    type: String,
    description: 'Filter by author (username)',
    required: false,
  })
  @ApiQuery({
    name: 'tag',
    type: String,
    description: 'Filter by tag',
    required: false,
  })
  @ApiQuery({
    name: 'favorited',
    type: String,
    description: 'Filter by favorites of a user (username)',
    required: false,
  })
  @ApiOkResponse({
    type: PagingDto<ArticleDto>,
  })
  @Get('global')
  async getGlobalArticle(
    @Query() query?: ArticleQueryParamsDto,
  ): Promise<PagingDto<ArticleDto>> {
    return await this.articleService.getGlobalArticles(query);
  }

  @ApiOkResponse({
    type: ArticleDto,
  })
  @Get(':slug')
  async getArticle(@Param('slug') slug: string): Promise<ArticleDto> {
    return await this.articleService.getArticle(slug);
  }

  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit number of comments returned (default is 20)',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    description: 'Offset/skip number of comments (default is 0)',
    required: false,
  })
  @ApiOkResponse({
    type: PagingDto<CommentDto>,
  })
  @Get(':slug/comment')
  async getArticleComments(
    @Param('slug') slug: string,
    @Query() query?: PagingQueryParamsDto,
  ): Promise<PagingDto<CommentDto>> {
    return await this.articleService.getComments(slug, query);
  }

  @ApiOkResponse({
    type: CommentDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':slug/comment')
  async createArticleComment(
    @Param('slug') slug: string,
    @Body() request: CreateCommentDto,
  ): Promise<CommentDto> {
    return await this.articleService.createComment(slug, request);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':slug/comment/:id')
  async deleteArticleComment(
    @Param('slug') slug: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.articleService.deleteComment(slug, id);
  }
}

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
  ApiTags,
} from '@nestjs/swagger';
import {
  ArticleDto,
  ArticleQueryParamsDto,
  ArticleService,
  CommentDto,
  UpsertArticleDto,
} from 'src/application/article';
import { PagingDto, PagingQueryParamsDto } from 'src/application/common';
import { AuthGuard } from 'src/infrastructure/auth';

@ApiTags('article')
@Controller()
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Post('article')
  async createArticle(@Body() request: UpsertArticleDto): Promise<ArticleDto> {
    return await this.articleService.createArticle(request);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Put('article/:slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() request: UpsertArticleDto,
  ): Promise<ArticleDto> {
    return await this.articleService.updateArticle(slug, request);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @Delete('article/:slug')
  async deleteArticle(@Param('slug') slug: string): Promise<void> {
    await this.articleService.deleteArticle(slug);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Post('article/:slug/favorite')
  async favoriteArticle(@Param('slug') slug: string): Promise<ArticleDto> {
    return await this.articleService.favoriteArticle(slug);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Delete('article/:slug/favorite')
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
  @Get('articles/feed')
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
  @ApiBearerAuth()
  @ApiOkResponse({
    type: PagingDto<ArticleDto>,
  })
  @Get('articles')
  async getGlobalArticle(
    @Query() query?: ArticleQueryParamsDto,
  ): Promise<PagingDto<ArticleDto>> {
    return await this.articleService.getGlobalArticles(query);
  }

  @ApiOkResponse({
    type: ArticleDto,
  })
  @Get('article/:slug')
  async getArticle(@Param('slug') slug: string): Promise<ArticleDto> {
    return await this.articleService.getArticle(slug);
  }

  @ApiOkResponse({
    type: CommentDto,
  })
  @Get('article/:slug/comment')
  async getArticleComments(@Param('slug') slug: string): Promise<CommentDto[]> {
    return await this.articleService.getComments(slug);
  }
}

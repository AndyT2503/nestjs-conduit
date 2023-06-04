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
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  ArticleService,
  ArticleDto,
  UpsertArticleDto,
} from 'src/application/article';
import { PagingDto } from 'src/application/common';
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
    type: PagingDto<ArticleDto>,
  })
  @UseGuards(AuthGuard)
  @Get('articles/feed')
  async getFeed(
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ): Promise<PagingDto<ArticleDto>> {
    return await this.articleService.getFeed(limit, offset);
  }

  @ApiOkResponse({
    type: ArticleDto,
  })
  @Get('article/:slug')
  async getArticle(@Param('slug') slug: string): Promise<ArticleDto> {
    return await this.articleService.getArticle(slug);
  }
}

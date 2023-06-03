import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from 'src/application/profile';

export class ArticleDto {
  @ApiProperty() title: string;
  @ApiProperty() description: string;
  @ApiProperty() body: string;
  @ApiProperty() tagList: string[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() favoritesCount: number;
  @ApiProperty() favorited: boolean;
  @ApiProperty() author: ProfileDto;
  @ApiProperty() slug: string;
}

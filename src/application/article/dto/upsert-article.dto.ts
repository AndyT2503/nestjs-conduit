import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpsertArticleDto {
  @ApiProperty() @IsNotEmpty() readonly title: string;
  @ApiProperty() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsNotEmpty() readonly body: string;
  @ApiProperty() readonly tagList: string[];
}

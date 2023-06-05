import { ApiProperty } from "@nestjs/swagger";
import { ProfileDto } from "src/application/profile";

export class CommentDto {
  @ApiProperty() id: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() content: string;
  @ApiProperty() author: ProfileDto;
}

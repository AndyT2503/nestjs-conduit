import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FollowProfileDto {
  @ApiProperty() @IsNotEmpty() username: string;
}
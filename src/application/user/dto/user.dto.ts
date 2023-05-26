import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty() username: string;
  @ApiProperty() email: string;
  @ApiProperty() token: string;
  @ApiProperty() bio: string | null;
  @ApiProperty() image: string | null;
}

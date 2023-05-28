import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty() username: string;
  @ApiProperty() bio: string | null;
  @ApiProperty() image: string | null;
  @ApiProperty() following: boolean;
}

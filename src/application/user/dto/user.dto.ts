import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty() username: string;
  @ApiProperty() email: string;
  @ApiProperty() token: string;
  @ApiProperty({
    type: 'string',
  })
  bio: string | null;
  @ApiProperty({
    type: 'string',
  })
  image: string | null;
}

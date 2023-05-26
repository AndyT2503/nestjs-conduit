import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty() @IsNotEmpty() @IsEmail() readonly email: string;
  @ApiProperty() @IsNotEmpty() readonly password: string;
}

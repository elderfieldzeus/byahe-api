import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}

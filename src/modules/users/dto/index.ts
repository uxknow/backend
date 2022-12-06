import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  firstName: string

  @IsString()
  @ApiProperty()
  username: string

  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string
}

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  firstName: string

  @IsString()
  @ApiProperty()
  username: string

  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string
}
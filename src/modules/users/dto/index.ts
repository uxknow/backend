import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string
}
import { IsString, IsEmail } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UserLoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  password: string
}
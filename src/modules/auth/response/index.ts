import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

class UserResponse {
  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}

export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse

  @ApiProperty()
  @IsString()
  token: string
}
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto';
import { AuthUserResponse } from './response';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({status: 201, type: CreateUserDto})  
  @Post('register')
  register (@Body() dto: CreateUserDto): Promise<AuthUserResponse> {
    return this.authService.registerUsers(dto)
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: AuthUserResponse})
  @Post('login')
  login (@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto)
  }
}

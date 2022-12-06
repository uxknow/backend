import { Injectable, BadRequestException } from '@nestjs/common';
import { AppError } from '../../common/constants/errors';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
    ) {}

  async registerUsers (dto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email)
      if(existUser) throw new BadRequestException(AppError.USER_EXIST)
      return this.userService.createUser(dto)
    } catch(err) {
      throw new Error(err)
    }
  }

  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email)
      if(!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)
      const validatePassword = await bcrypt.compare(dto.password, existUser.password)
      if(!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
      const user = await this.userService.publicUser(dto.email)
      const token = await this.tokenService.generateJwtToken(user)
      return {user, token}
    } catch(err) {
      throw new Error(err)
    }
  }
}

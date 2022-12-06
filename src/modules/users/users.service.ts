import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async hashPassword (password) {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail (email: string) {
    return this.userRepository.findOne({where: {email: email}})
  }

 async createUser(createUserDto): Promise<CreateUserDto> {
    createUserDto.password = await this.hashPassword(createUserDto.password)
    await this.userRepository.create({
      firstName: createUserDto.firstName,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password
    })
    return createUserDto
  }

  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: {email},
      attributes: {exclude: ['password']},
      include: {
        model: Watchlist,
        required: false
      }
    })
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(dto, {where: {email}})
    return dto
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.userRepository.destroy({where: {email}})
    return true
  }
}

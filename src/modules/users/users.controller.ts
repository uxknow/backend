import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags("API")
  @ApiResponse({status: 200, type: UpdateUserDto})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {
    const user = request.user
    return this.userService.updateUser(user.email, updateDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user
    return this.userService.deleteUser(user.email)
  }
}

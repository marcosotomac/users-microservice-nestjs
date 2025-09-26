import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // Remove password_hash from response
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    // Remove password_hash from all users in response
    return users.map(({ password_hash, ...user }) => user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    // Remove password_hash from response
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    // Remove password_hash from response
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}

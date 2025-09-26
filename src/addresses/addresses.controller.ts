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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(@Body(ValidationPipe) createAddressDto: CreateAddressDto) {
    return await this.addressesService.create(createAddressDto);
  }

  @Get()
  async findAll() {
    return await this.addressesService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.addressesService.findByUserId(userId);
  }

  @Get('user/:userId/default')
  async findDefaultByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.addressesService.findDefaultByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.addressesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
  ) {
    return await this.addressesService.update(id, updateAddressDto);
  }

  @Patch(':id/set-default')
  async setAsDefault(@Param('id', ParseIntPipe) id: number) {
    return await this.addressesService.setAsDefault(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.addressesService.remove(id);
    return { message: 'Address deleted successfully' };
  }
}

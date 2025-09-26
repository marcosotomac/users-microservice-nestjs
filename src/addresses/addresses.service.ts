import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    // Verify that the user exists
    const user = await this.userRepository.findOne({
      where: { id: createAddressDto.user_id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createAddressDto.user_id} not found`,
      );
    }

    // If this is set as default, unset other default addresses for this user
    if (createAddressDto.is_default) {
      await this.addressRepository.update(
        { user_id: createAddressDto.user_id, is_default: true },
        { is_default: false },
      );
    }

    const address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({
      relations: ['user'],
    });
  }

  async findByUserId(userId: number): Promise<Address[]> {
    // Verify that the user exists
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return await this.addressRepository.find({
      where: { user_id: userId },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return address;
  }

  async findDefaultByUserId(userId: number): Promise<Address | null> {
    return await this.addressRepository.findOne({
      where: { user_id: userId, is_default: true },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);

    // If updating to set as default, unset other default addresses for this user
    if (updateAddressDto.is_default === true) {
      await this.addressRepository
        .createQueryBuilder()
        .update(Address)
        .set({ is_default: false })
        .where('user_id = :userId AND is_default = true AND id != :id', {
          userId: address.user_id,
          id: id,
        })
        .execute();
    }

    Object.assign(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }

  async setAsDefault(id: number): Promise<Address> {
    const address = await this.findOne(id);

    // Unset other default addresses for this user
    await this.addressRepository.update(
      { user_id: address.user_id, is_default: true },
      { is_default: false },
    );

    address.is_default = true;
    return await this.addressRepository.save(address);
  }
}

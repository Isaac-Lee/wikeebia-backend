import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Keyboard } from './entity/keyboard.entity';

@Injectable()
export class KeyboardService {
  constructor(
    @InjectRepository(Keyboard)
    private keyboardRepository: Repository<Keyboard>,
  ) {}

  async findAll(): Promise<Keyboard[]> {
    return await this.keyboardRepository.find();
  }

  async findOne(id: number): Promise<Keyboard> {
    return await this.keyboardRepository.findOne(id);
  }

  async create(keyboard: Keyboard): Promise<void> {
    await this.keyboardRepository.save(keyboard);
  }

  async update(id: number, keyboard: Keyboard): Promise<UpdateResult> {
    return this.keyboardRepository.update(id, keyboard);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.keyboardRepository.delete(id);
  }
}

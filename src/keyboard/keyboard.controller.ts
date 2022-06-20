import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Keyboard } from './entity/keyboard.entity';
import { KeyboardService } from './keyboard.service';

@Controller('keyboard')
export class KeyboardController {
  constructor(private keyboardService: KeyboardService) {}

  @Get()
  findAll(): Promise<Keyboard[]> {
    return this.keyboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Keyboard> {
    return this.keyboardService.findOne(id);
  }

  @Post()
  create(@Body() keyboard: Keyboard): Promise<void> {
    return this.keyboardService.create(keyboard);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() keyboard: Keyboard,
  ): Promise<UpdateResult> {
    return this.keyboardService.update(id, keyboard);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.keyboardService.delete(id);
  }
}

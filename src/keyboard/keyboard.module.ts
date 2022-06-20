import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyboard } from './entity/keyboard.entity';
import { KeyboardController } from './keyboard.controller';
import { KeyboardService } from './keyboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Keyboard])],
  exports: [TypeOrmModule],
  controllers: [KeyboardController],
  providers: [KeyboardService],
})
export class KeyboardModule {}

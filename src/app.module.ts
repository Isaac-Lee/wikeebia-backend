import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Keyboard } from './keyboard/entity/keyboard.entity';
import { KeyboardModule } from './keyboard/keyboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../.dev.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Keyboard],
      synchronize: true,
    }),
    KeyboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Keyboard } from './entity/keyboard.entity';
import { KeyboardController } from './keyboard.controller';
import { KeyboardService } from './keyboard.service';

const mockKeyboardRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});

// type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('KeyboardController', () => {
  let controller: KeyboardController;
  // let keyboardRepository: MockRepository<Keyboard>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyboardController],
      providers: [
        KeyboardService,
        {
          provide: getRepositoryToken(Keyboard),
          useValue: mockKeyboardRepository(),
        },
      ],
    }).compile();

    controller = module.get<KeyboardController>(KeyboardController);
    // keyboardRepository = module.get<MockRepository<Keyboard>>(
    //   getRepositoryToken(Keyboard),
    // );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

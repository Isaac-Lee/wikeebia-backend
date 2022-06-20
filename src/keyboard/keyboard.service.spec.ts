import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  DeleteResult,
  EntityNotFoundError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Keyboard } from './entity/keyboard.entity';
import { KeyboardService } from './keyboard.service';

const mockKeyboardRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('KeyboardService', () => {
  let service: KeyboardService;
  let keyboardRepository: MockRepository<Keyboard>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeyboardService,
        {
          provide: getRepositoryToken(Keyboard),
          useValue: mockKeyboardRepository(),
        },
      ],
    }).compile();

    service = module.get<KeyboardService>(KeyboardService);
    keyboardRepository = module.get<MockRepository<Keyboard>>(
      getRepositoryToken(Keyboard),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of keyboards', async () => {
      keyboardRepository.find.mockResolvedValue([]);
      const result = await service.findAll();
      expect(keyboardRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    const findOneArgs = { id: 1 };
    it('should return a keyboard', async () => {
      const mockedKeyboard = {
        id: 1,
        name: 'Keyboard',
      };
      keyboardRepository.findOne.mockResolvedValue(mockedKeyboard);
      const result = await service.findOne(findOneArgs.id);
      expect(keyboardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(keyboardRepository.findOne).toHaveBeenCalledWith(findOneArgs.id);
      expect(result).toEqual(mockedKeyboard);
    });
    it('should fail if no keyboard found', async () => {
      const notFoundError = new EntityNotFoundError(Keyboard, findOneArgs.id);
      keyboardRepository.findOne.mockResolvedValue(notFoundError);
      const result = await service.findOne(findOneArgs.id);
      expect(keyboardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(keyboardRepository.findOne).toHaveBeenCalledTimes(findOneArgs.id);
      expect(result).toEqual(new EntityNotFoundError(Keyboard, findOneArgs.id));
    });
  });

  describe('create', () => {
    const createArgs = {
      id: 1,
      name: 'Keyboard',
    };
    it('should create a keyboard', async () => {
      keyboardRepository.save.mockResolvedValue(null);
      const result = await service.create(createArgs);
      expect(keyboardRepository.save).toHaveBeenCalledTimes(1);
      expect(keyboardRepository.save).toHaveBeenCalledWith(createArgs);
      expect(result).toEqual(undefined);
    });
  });

  describe('update', () => {
    const updateArgs = {
      id: 1,
      name: 'Test',
    };
    it('should update a keyboard', async () => {
      const updateResult = new UpdateResult();
      keyboardRepository.update.mockResolvedValue(updateResult);
      const result = await service.update(updateArgs.id, updateArgs);
      expect(keyboardRepository.update).toHaveBeenCalledTimes(1);
      expect(keyboardRepository.update).toHaveBeenCalledWith(
        updateArgs.id,
        updateArgs,
      );
      expect(result).toEqual(updateResult);
    });
    it('should fail if no keyboard found', async () => {
      const notFoundError = new EntityNotFoundError(Keyboard, 1);
      keyboardRepository.update.mockResolvedValue(notFoundError);
      const result = await service.update(updateArgs.id, updateArgs);
      expect(keyboardRepository.update).toHaveBeenCalledTimes(1);
      expect(keyboardRepository.update).toHaveBeenCalledWith(
        updateArgs.id,
        updateArgs,
      );
      expect(result).toEqual(new EntityNotFoundError(Keyboard, 1));
    });
  });

  describe('delete', () => {
    const deleteArgs = { id: 1 };
    it('should delete a keyboard', async () => {
      const deleteResult = new DeleteResult();
      keyboardRepository.delete.mockResolvedValue(deleteResult);
      const result = await service.delete(deleteArgs.id);
      expect(keyboardRepository.delete).toHaveBeenCalledTimes(1);
      expect(keyboardRepository.delete).toHaveBeenCalledWith(deleteArgs.id);
      expect(result).toEqual(deleteResult);
    });
    it('should fail if no keyboard found', async () => {
      const notFoundError = new EntityNotFoundError(Keyboard, 1);
      keyboardRepository.delete.mockResolvedValue(notFoundError);
      const result = await service.delete(deleteArgs.id);
      expect(keyboardRepository.delete).toHaveBeenCalledTimes(1);
      expect(keyboardRepository.delete).toHaveBeenCalledWith(deleteArgs.id);
      expect(result).toEqual(new EntityNotFoundError(Keyboard, 1));
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersCRUDController } from '../src/users/controllers/users-crud.controller';

describe('UsersController', () => {
  let controller: UsersCRUDController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersCRUDController],
    }).compile();

    controller = module.get<UsersCRUDController>(UsersCRUDController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

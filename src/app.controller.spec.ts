import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

import pkg from "../package.json";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API version v' + pkg.version, () => {
      expect(appController.index()).toHaveProperty('version', pkg.version);
    });
  });
});

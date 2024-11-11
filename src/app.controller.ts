import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async getHello(): Promise<string> {
    return 'ok';
  }

  @Get('/api/health-check')
  async getAPIHealthCheck(): Promise<string> {
    return 'ok';
  }
}

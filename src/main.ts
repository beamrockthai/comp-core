import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { urlencoded } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';

import 'dotenv/config';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';
import { IncomingMessage, ServerResponse } from 'http';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
  });

  app.use(urlencoded({ extended: true }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  const configService = app.get<ConfigService>(ConfigService);
  const appPort = configService.get<string>('APP_PORT');
  const port = parseInt(appPort, 10);
  console.log('running on port: ', port);

  if (process.env.APP_ENV === 'local') {
    // Custom token for colored HTTP methods
    morgan.token('method', function (req: IncomingMessage) {
      switch (req.method) {
        case 'GET':
          return chalk.green(req.method);
        case 'POST':
          return chalk.yellow(req.method);
        case 'PUT':
          return chalk.blue(req.method);
        case 'DELETE':
          return chalk.red(req.method);
        default:
          return req.method;
      }
    });

    // Custom token for colored HTTP response status
    morgan.token(
      'status',
      function (req: IncomingMessage, res: ServerResponse) {
        // Determine color based on the status code's first digit
        const statusCodeFirstDigit = Math.floor((res.statusCode || 500) / 100);

        switch (statusCodeFirstDigit) {
          case 2: // 2xx
            return chalk.green(res.statusCode);
          case 4: // 4xx
            return chalk.yellow(res.statusCode);
          case 5: // 5xx
            return chalk.red(res.statusCode);
          default:
            return res.statusCode.toString(); // Default color (no coloring)
        }
      },
    );

    app.use(
      morgan(
        ':method :status :res[content-length] B - :response-time ms  :url',
      ),
    );
  }

  await app.listen(port);
}
bootstrap();

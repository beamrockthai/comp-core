// import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// const Module = RedisModule.forRootAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (
//     configService: ConfigService,
//   ): Promise<RedisModuleOptions> => {
//     return {
//       config: {
//         host: configService.get('REDIS_HOST'),
//         port: configService.get('REDIS_PORT'),
//       },
//     };
//   },
// });

// export default Module;

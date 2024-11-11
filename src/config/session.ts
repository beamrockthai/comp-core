// import { NestExpressApplication } from '@nestjs/platform-express';
// import session from 'express-session';
// import * as connectRedis from 'connect-redis';

// import Redis from 'ioredis';

// const RedisStore = connectRedis(session);
// const secret = process.env.APP_SECRET_SESSION;

// export function configureSession(app: NestExpressApplication) {
//   const client = new Redis({ port: 6370 });

//   app.use(
//     session({
//       name: '_sess',
//       cookie: {
//         secure: false,
//         path: '/',
//       },
//       store: new RedisStore({ client }),
//       secret: secret,
//       resave: false,
//       saveUninitialized: true,
//     }),
//   );
// }

import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as session from 'express-session';
import flash = require('connect-flash');
import { engine } from 'express-handlebars';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const publicPath = join(__dirname, '..', 'public');
  const viewsPath = join(__dirname, '..', 'views');
  app.useStaticAssets(publicPath);
  app.setBaseViewsDir(viewsPath);
  app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('view engine', 'hbs');
  // app.enable('view cache');

  // SECURITY SETUP
  app.use(helmet());
  app.enableCors();
  app.use(csurf());

  // SESSION SETUP
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // PASSPORT AUTH SETUP
  app.use(passport.initialize());
  app.use(passport.session());

  // FLASH MESSAGES
  app.use(flash());

  // DB CONFIG

  // RATE LIMITING
  // TODO: https://docs.nestjs.com/security/rate-limiting

  await app.listen(3000);
}
bootstrap();

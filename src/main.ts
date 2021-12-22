import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as helmet from 'helmet';
import * as csrf from 'csurf';
import * as session from 'express-session';
import flash = require('connect-flash');
import { engine } from 'express-handlebars';
import * as passport from 'passport';

import { AppModule } from './app.module';
import { AuthExceptionFilter } from './auth/auth-exceptions.filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const publicPath = join(__dirname, 'public');
  const viewsPath = join(__dirname, 'views');
  app.useStaticAssets(publicPath);
  app.setBaseViewsDir(viewsPath);
  app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('view engine', 'hbs');
  // app.enable('view cache');

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

  // SECURITY SETUP
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [
          "'self'",
          "'unsafe-inline'",
          'data:',
          'https://cdn.jsdelivr.net',
          'https://maxcdn.bootstrapcdn.com',
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
        ],
      },
    }),
  );
  app.enableCors();
  app.use(csrf({ value: (req) => req.csrfToken() }));

  // FLASH MESSAGES
  app.use(flash());

  app.useGlobalFilters(new AuthExceptionFilter());

  // DB CONFIG

  // RATE LIMITING
  // TODO: https://docs.nestjs.com/security/rate-limiting

  await app.listen(3000);
}
bootstrap();

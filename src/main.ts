import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { engine } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const publicPath = join(__dirname, '..', 'public');
  const viewsPath = join(__dirname, '..', 'views');
  app.useStaticAssets(publicPath);
  app.setBaseViewsDir(viewsPath);
  app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('view engine', 'hbs');
  // app.enable('view cache');

  await app.listen(3000);
}
bootstrap();

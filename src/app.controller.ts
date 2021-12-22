import { Controller, Get, Request, Render, UseGuards } from '@nestjs/common';

import { AuthenticatedGuard } from './auth/authenticated.guard';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  // APP ROUTES
  @UseGuards(AuthenticatedGuard)
  @Get('/')
  @Render('index')
  index(@Request() req): { user: User; title: string } {
    return { user: req.user, title: 'Home' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req): { user: User; title: string } {
    return { user: req.user, title: 'Profile' };
  }
}

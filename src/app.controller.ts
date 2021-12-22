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

  @Get('/about')
  @Render('about')
  about(@Request() req): { title: string } {
    return { title: 'About' };
  }

  @Get('/contact')
  @Render('contact')
  contact(@Request() req): { title: string } {
    return { title: 'Contact Us' };
  }

  @Get('/error')
  @Render('error')
  error(@Request() req): { title: string } {
    return { title: 'Error' };
  }
}

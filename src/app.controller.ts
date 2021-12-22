import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Render,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  // AUTH ROUTES
  @Get('/login')
  @Render('login')
  loginPage(@Request() req): {
    message: string;
    csrfToken: string;
    title: string;
  } {
    return {
      message: req.flash('loginError'),
      csrfToken: req.csrfToken(),
      title: 'Login',
    };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response): void {
    res.redirect('/');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

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

import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Render,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './login.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller()
export class AuthController {
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
}

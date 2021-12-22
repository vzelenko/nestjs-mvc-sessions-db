import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (this.forHtml(exception, request)) {
      request.flash('loginError', 'Please try again!');
      response.redirect('/login');
    } else {
      response.redirect('/error');
    }
  }

  private forHtml(exception: HttpException, request: Request): boolean {
    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException ||
      request.is('html')
    ) {
      return true;
    }
    return false;
  }
}
